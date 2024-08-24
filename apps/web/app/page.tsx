import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "../lib/auth";
import Landing from "../screens/Landing";

const getUserDetails = async () => {
  // console.log('get user details start');
  // const date = new Date();
  const session = await getServerSession(authOptions);
  // console.log(
  //   `get user details end ${  (new Date().getTime() - date.getTime()) / 1000}`,
  // );
  return session;
};

export default async function Home() {
  const session = await getUserDetails();
  console.log({ session });

  if (!session || !session?.user) {
    redirect("/auth");
  }

  return (
    <main>
      <Landing />
    </main>
  );
}
