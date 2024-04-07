import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { env } from "@/env";
import { db } from "@/server/db";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt"

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => {
      session.user.id = token.userId;
      return session;
    },
    jwt: ({ token }) => {
      token.userId = token.sub!;
      return token;
    },
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        const retrievedUser = await db.user.findUnique({
          where: {
            id: user.id
          }
        })

        if (retrievedUser) {
          return !!user.email;
        }

        await db.user.create({
          data: {
            name: user.name || "",
            email: user.email || "",
            image: user.image || "",
            verified: true,
            type: "CUSTOMER"
          }
        })
      }
      return !!user.email;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  secret: env.NEXTAUTH_SECRET,
  providers: [
    Google({
      name: "google",
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
        userType: { label: "userType", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.error("Error: Credentials not found")
          return null;
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
            verified: true,
          }
        })

        if (!user ?? !user?.pw_hash) {
          console.error("Error: Couldn't get the user from database.")
          return null;
        }

        const passwordsMatch = await bcrypt.compare(credentials.password, user.pw_hash);

        if (!passwordsMatch) {
          console.error("Error: Passwords don't match.")
          return null;
        }

        console.log("Authorization successfull!")
        return user;
      }
    })
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
