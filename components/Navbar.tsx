"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import { ModeToggle } from "./theme-toggle";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const session = useSession();
  const pathname = usePathname();

  console.log("pathname", pathname);
  return (
    <div className={`${pathname === "/" && "relative"}`}>
      <div
        className={`${
          pathname === "/" && "absolute"
        } w-full py-6 flex justify-between items-center z-10`}
      >
        <Link href="/">
          <span className="text-2xl font-black">100xQuiz</span>
        </Link>

        <div className="flex justify-center items-center">
          <div className="mr-3">
            <ModeToggle />
          </div>

          {session.data?.user ? (
            <Popover>
              <PopoverTrigger asChild className="hover:cursor-pointer">
                <Avatar>
                  <AvatarImage
                    src={session.data?.user?.image || ""}
                    alt={session.data.user.name || ""}
                  />
                  <AvatarFallback>
                    {session.data.user.name?.at(0)}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="max-w-fit max-h-fit">
                <div className="hover:cursor-pointer" onClick={() => signOut()}>
                  Log Out
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <Button onClick={() => signIn("google")}>Log In</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
