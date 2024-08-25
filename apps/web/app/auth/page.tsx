import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import SignIn from "../../components/SignIn";
import { authOptions } from "../../lib/auth";

const getUserDetails = async () => await getServerSession(authOptions);

const AuthPage = async () => {
  const session = await getUserDetails();

  if (session) {
    redirect("/");
  }

  return <SignIn />;
};

export default AuthPage;
