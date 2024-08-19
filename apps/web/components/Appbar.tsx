import Link from "next/link";
import { Button } from "@repo/ui";
// import { ModeToggle } from "./ModeToggle";
// import { signIn } from "next-auth/react";

import { useSession } from "next-auth/react";
// import UserAccountDropDown from "./UserAccountDropDown";


export const Appbar = () => {
//   const session = useSession();
//   const user = session.data?.user;

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 p-3 flex justify-center border-b shadow-md sticky top-0 z-50">
      <div className="max-w-screen-xl flex justify-between w-full">
        <Link href={"/"}>
          <div className="dark:text-zinc-100 text-zinc-950 text-2xl font-semibold">Aptitude</div>
        </Link>
        <div className="flex items-center gap-2">
          {/* {!user ? (
            <Button
              variant={"outline"}
              onClick={async () => {
                await signIn();
              }}
            >
              Login
            </Button>
          ) : (
            ""
          )} */}

          {/* <ModeToggle /> */}
          {/* <UserAccountDropDown /> */}
        </div>
      </div>
    </div>
  );
};
