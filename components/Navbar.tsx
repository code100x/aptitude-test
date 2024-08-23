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

const Navbar = () => {
  const session = useSession();

  return (
    <div className="py-4 flex justify-between items-center">
      <Link href="/">
        <span className="text-xl font-bold">100xQuiz</span>
      </Link>

      <div>
        {session.data?.user ? (
          <Popover>
            <PopoverTrigger asChild className="hover:cursor-pointer">
              <Avatar>
                <AvatarImage
                  src={session.data?.user?.image || ""}
                  alt={session.data.user.name || ""}
                />
                <AvatarFallback>{session.data.user.name?.at(0)}</AvatarFallback>
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
  );
};

export default Navbar;
