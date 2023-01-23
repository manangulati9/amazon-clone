import Image from "next/image";
import amznLogo from "../../public/assets/Amazon_logo.svg";
import Link from "next/link";
import { signUp } from "../../utils/functions";
import { useRouter } from "next/router";
import { useRef } from "react";
// TODO: Add autologin func to handleSumbit func
export default function () {
  const pwdRef = useRef<any>(null);
  const router = useRouter();
  return (
    <div className="flex flex-col gap-7 items-center mt-10 py-4 text-xs">
      <Link href="/">
        <Image src={amznLogo} alt="" height={200} width={200} />
      </Link>
      <div className="flex flex-col gap-3 mt-3">
        <div className="border border-gray-400 px-4 py-3 flex flex-col gap-3 rounded shadow-xl">
          <h1 className="text-2xl">Sign up</h1>
          <form
            onSubmit={(e) => {
              signUp(e, "customer");
              router.push("/");
            }}
            method="post"
            className="text-xs flex flex-col gap-2 mt-2"
          >
            <div className="flex gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName" className="block font-emberBd ">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="rounded h-8 text-xs"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lastName" className="block font-emberBd ">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="rounded h-8 text-xs"
                />
              </div>
            </div>
            <label htmlFor="email" className="block font-emberBd ">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="rounded h-8 text-xs"
              required
            />
            <label htmlFor="password" className="block font-emberBd">
              Password
            </label>

            <input
              type="password"
              name="password"
              className="rounded h-8 text-xs"
              required
              ref={pwdRef}
            />
            <div className="flex gap-2">
              <input
                name="pwdshow"
                type="checkbox"
                className="rounded focus:outline-none"
                onClick={() => {
                  const x = pwdRef.current;
                  if (x.type === "password") {
                    x.type = "text";
                  } else {
                    x.type = "password";
                  }
                }}
              />
              <label htmlFor="pwdshow">Show password</label>
            </div>
            <button
              className="bg-gradient-to-t from-yellow-300 to-yellow-100  rounded hover:to-yellow-200 w-48 py-1.5 border-orange-300 border text-sm self-center mt-4"
              type="submit"
            >
              Create account
            </button>
          </form>
          <p>
            By continuing, you agree to Amazon's{" "}
            <Link href="" className="text-blue-500 hover:underline">
              Conditions of Use and Privacy Notice.
            </Link>
          </p>
          <Link href="" className="text-blue-500 hover:underline">
            Need help?
          </Link>
        </div>
      </div>
    </div>
  );
}
