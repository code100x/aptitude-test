"use client";

import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

import styles from "./SignIn.module.css";

const SignIn = () => {
  return (
    <div className={`flex h-screen items-center justify-center bg-[#070e22] ${styles.bgImage}`}>
      <div className="relative mx-auto box-border w-[70%] rounded-xl border-[0.5px] border-slate-400 p-6 md:w-[70%] lg:w-[30%]">
        <div className="text-center text-4xl font-light text-neutral-100">Welcome</div>
        <div className="my-3 text-center text-xl font-light text-neutral-100">
          Please choose an option to login
        </div>
        <button
          type="submit"
          className="text-md mt-10 flex w-full items-center justify-center gap-2 rounded border px-4 py-3 font-light text-lime-50 hover:opacity-85 focus:outline-none focus:ring-2"
          onClick={async () => {
            await signIn("google", { callbackUrl: "/" });
          }}
        >
          <Image
            src="/google.svg"
            className="mr-2 h-5 w-5"
            alt="Google Icon"
            width={25}
            height={25}
          />
          Continue with Google
        </button>
        <div className="my-4 text-center text-neutral-100">or</div>
        <button
          type="submit"
          className="text-md flex w-full items-center justify-center gap-2 rounded border bg-slate-100 px-4 py-3 font-normal text-neutral-700 hover:opacity-85 focus:outline-none focus:ring-2"
          onClick={async () => {
            await signIn("github", { callbackUrl: "/" });
          }}
        >
          <Image
            src="/github.svg"
            className="mr-2 h-5 w-5"
            alt="Google Icon"
            width={25}
            height={25}
          />
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default SignIn;
