"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CardSpotlight } from "./ui/card-spotlight";
import { LuClock } from "react-icons/lu";
import { BsUiChecksGrid } from "react-icons/bs";
import { MdInsights } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";

const Hero = () => {
  const session = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (session.data?.user?.email) {
      router.push("/quiz");
    } else {
      toast("Please Log In to proceed");
    }
  };
  return (
    <CardSpotlight
      className="bg-transparent px-2 cursor-none w-screen h-screen"
      radius={100}
    >
      <div className="flex flex-col items-center">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]" />

        <h1 className="text-6xl font-black text-center mt-20 z-20">100xQuiz</h1>

        <div className="flex md:flex-row justify-between min-w-[80vw]  mt-32">
          <div className="md:w-1/2 flex justify-center items-center md:flex-col">
            <h2 className="text-4xl mt-4 font-bold z-20">Ace our quizzes</h2>
            <h2 className="text-4xl mt-4 font-bold z-20">
              Prove your aptitude
            </h2>
            {/* <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-gray-700 dark:via-gray-400 dark:to-white">
        Ace our quizzes <br /> Prove your aptitude
      </h1> */}
            <div className="w-full flex justify-center items-center mt-20">
              <div
                onClick={handleClick}
                className="relative h-fit w-fit overflow-hidden rounded-xl p-[4px] backdrop-blur-3xl hover:cursor-pointer hover:scale-[102%] hover:shadow-2xl dark:hover:shadow-slate-700 transition-all"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <div className="inline-flex h-fit w-fit items-center justify-center rounded-xl dark:bg-[#fff] dark:text-black bg-gray-900 px-4 py-3 text-base font-bold text-gray-50 backdrop-blur-3xl">
                  Take Quiz Now
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 grid grid-cols-2">
            <div className="w-2/3 mx-auto">
              <div className="text-center text-white text-lg font-bold z-30 border rounded-xl h-28 flex flex-col bg-slate-100 dark:bg-slate-900 overflow-clip relative group transition-all">
                <LuClock className="text-8xl top-0 -left-6 -mt-6 text-gray-700 absolute group-hover:text-gray-500 transition-all" />
                <span className="text-black dark:text-gray-100 z-20 text-xl my-auto">
                  Time Keeping
                </span>
              </div>
            </div>

            <div className="w-2/3 mt-10 ml-0">
              <div className="text-center text-white text-lg font-bold z-30 border rounded-xl h-28 flex flex-col bg-slate-100 dark:bg-slate-900 overflow-clip relative group transition-all">
                <BsUiChecksGrid className="text-8xl top-0 -right-3 mt-10 text-gray-700 absolute group-hover:text-gray-500 transition-all" />
                <span className="text-black dark:text-gray-100 z-20 text-xl my-auto">MCQ</span>
              </div>
            </div>

            <div className="w-2/3 mx-auto">
              <div className="text-center text-white text-lg font-bold z-30 border rounded-xl h-28 flex flex-col bg-slate-100 dark:bg-slate-900 overflow-clip relative group transition-all">
                <MdInsights className="text-8xl top-0 -left-3 -mt-2 text-gray-700 absolute group-hover:text-gray-500 transition-all" />
                <span className="text-black dark:text-gray-100 z-20 text-xl my-auto">
                  Insights
                </span>
              </div>
            </div>

            <div className="w-2/3 mt-10 ml-0">
              <div className="text-center text-white text-lg font-bold z-30 border rounded-xl h-28 flex flex-col bg-slate-100 dark:bg-slate-900 overflow-clip relative group transition-all">
                <GiNotebook className="text-8xl top-0 -right-1 mt-10 text-gray-700 absolute group-hover:text-gray-500 transition-all" />
                <span className="text-black dark:text-gray-100 z-20 text-xl my-auto">
                  Solutions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardSpotlight>
  );
};

export default Hero;
