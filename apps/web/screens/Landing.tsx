"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";

import styles from "./Landing.module.css";

const Landing = () => {
  const router = useRouter();
  const session = useSession();
  const user = session.data?.user;

  const handleClick = () => {
    router.push("/instructions");
  };

  return (
    <div
      className={cn(
        `flex h-screen w-screen flex-col items-center justify-center bg-[#070e22] ${styles.bgImage}`,
      )}
    >
      {!!user?.email && (
        <>
          <div
            className="absolute right-24 top-12 cursor-pointer text-slate-100"
            onClick={() => signOut()}
          >
            Logout
          </div>
          <div className="mb-4 text-xl text-white">{`Hi! ${user?.name}`}</div>
        </>
      )}
      <button
        type="submit"
        className="text-md flex items-center justify-center gap-2 rounded border px-4 py-3 font-light text-lime-50 hover:opacity-85 focus:outline-none focus:ring-2"
        onClick={async () => {
          handleClick();
        }}
      >
        Get Started
      </button>
      <Footer />
    </div>
  );
};

export default Landing;
