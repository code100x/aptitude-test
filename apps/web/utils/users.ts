import db from "@repo/db/client";

interface IUserData {
  name: string;
  email: string;
  image: string;
  provider?: string;
}

export const createUser = async (userData: IUserData) => {
  try {
    await db.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        avatar: userData.image,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
