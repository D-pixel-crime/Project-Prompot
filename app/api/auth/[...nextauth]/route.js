import { connectToDB } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

console.log(
  process.env.GOOGLE_OAUTH_CLIENTID,
  process.env.GOOGLE_OAUTH_CLIENT_SECRET
);

const handleGoogleAuth = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENTID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {},
  async signIng({ profile }) {
    try {
      // every nextJS route is a serverless route,
      // which means they are LAMBDA functions,
      // i.e they work only when they are actually needed,
      // e.g: the mongoDB server will not keep on running

      await connectToDB();

      // check if a user already exists, if not create a new user

      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  },
});

export { handleGoogleAuth as GET, handleGoogleAuth as POST };
