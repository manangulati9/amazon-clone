import Image from "next/image";
import amznLogo from "../../public/assets/Amazon_logo.svg";
import Link from "next/link";
import { UserSignIn } from "../../utils/functions";
export default function () {
  return (
    <div className="grid place-items-center py-4 gap-3 text-xs mt-8">
      <Link href="/">
        <Image src={amznLogo} alt="" height={200} width={200} />
      </Link>
      <div className="flex flex-col gap-3 mt-3">
        <div className="border border-gray-400 px-4 py-3 flex flex-col gap-3 rounded shadow-xl">
          <h1 className="text-2xl">Sign in</h1>
          <form
            className="text-xs flex flex-col gap-2 mt-2"
            onSubmit={(e) => UserSignIn(e)}
          >
            <label htmlFor="email" className="block font-emberBd ">
              Email
            </label>
            <input type="email" name="email" className="rounded h-8 text-xs" />
            <label htmlFor="password" className="block font-emberBd">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="rounded h-8 text-xs"
            />
            <button
              className="bg-gradient-to-t from-yellow-300 to-yellow-100  rounded hover:to-yellow-200 w-48 py-1.5 border-orange-300 border text-sm self-center mt-4"
              type="submit"
            >
              Submit
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
        <div className="flex items-center gap-2 mt-3">
          <div className="bg-gray-500 border w-full"></div>
          <p className="shrink-0">New to Amazon?</p>
          <div className="bg-gray-500 border w-full"></div>
        </div>
        <Link href="/login/sign_up">
          {" "}
          <button className="bg-gradient-to-t from-slate-200 to-slate-100 rounded hover:from-slate-300 hover:to-slate-200 py-1.5 text-sm self-center border border-gray-400 w-full">
            Create your account
          </button>
        </Link>
      </div>
    </div>
  );
}
