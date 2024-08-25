import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import Landing from "@/screens/Landing";

const getUserDetails = async () => await getServerSession(authOptions);

const Home = async () => {
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
};

export default Home;
