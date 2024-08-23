import GoogleProvider from "next-auth/providers/google";
import { Session } from "next-auth";
import db from "@/app/db";

export interface session extends Session {
  user: {
    name: string;
    email: string;
    image: string;
    uid: string;
  };
}

export const authConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      if (account.provider === "google") {
        const { email, name, image } = user;

        if (!email) {
          return false;
        }

        const userExists = await db.user.findFirst({
          where: {
            email,
          },
        });

        if (userExists) {
          return true;
        }

        await db.user.create({
          data: {
            name,
            email,
            userImage: image,
            provider: "Google",
            providerAccountId: account.providerAccountId,
          },
        });

        return true;
      }

      return false;
    },
    async jwt({ token, profile, account }: any) {
        const userExists = await db.user.findFirst({
          where: {
            providerAccountId: account?.providerAccountId ?? "",
          },
        });
  
        if (userExists) {
          token.uid = userExists.id;
        }
  
        return token;
      },
      session: ({ session, token }: any): session => {
        const newSession: session = session as session;
        if (newSession.user && token.uid) {
          newSession.user.uid = token.uid ?? "";
        }
  
        return newSession!;
      },
  },
};
