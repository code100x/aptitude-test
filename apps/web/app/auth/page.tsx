import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import SignIn from "../../components/SignIn";
import { authOptions } from "../../lib/auth";

const getUserDetails = async () => {
  // console.log('get user details start');
  // const date = new Date();
  const session = await getServerSession(authOptions);
  // console.log(
  //   `get user details end ${  (new Date().getTime() - date.getTime()) / 1000}`,
  // );
  return session;
};

const AuthPage = async () => {
  const session = await getUserDetails();

  if (session) {
    redirect("/");
  }

  // const session = useSession
  return <SignIn />;
};

export default AuthPage;
