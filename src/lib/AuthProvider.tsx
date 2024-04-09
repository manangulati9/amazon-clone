'use client'
import type { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

type ProviderProps = React.PropsWithChildren & {
  session: Session | null;
}

export function AuthProvider({ children, session }: ProviderProps) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}
