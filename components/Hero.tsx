"use client"

import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner"

const Hero = () => {
    const session = useSession();
    const router = useRouter();

const handleClick = () => {
    if(session.data?.user?.email) {
        router.push("/quiz");
    } else {
        toast("Please Log In to proceed", {style: {background: "#fbf8cc"}})
    }
}
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-6xl font-black text-center">100xQuiz</h1>
      <h2 className="text-2xl mt-4 font-bold text-[#8d3e1f]">
        Take quiz and prove your aptitude
      </h2>

      <div className="w-full flex justify-center items-center mt-20">
          <Button variant={"secondary"} className="bg-secondary" onClick={handleClick}>
            Take Quiz
          </Button>
      </div>
    </div>
  );
};

export default Hero;
