import { User } from "@models/user";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handleGoogleAuth = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENTID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {
    const user = await User.findOne({ email: session.user.email });

    session.user.id = user._id;

    return session;
  },
  async signIng({ profile }) {
    try {
      // every nextJS route is a serverless route,
      // which means they are LAMBDA functions,
      // i.e they work only when they are actually needed,
      // e.g: the mongoDB server will not keep on running

      await connectToDB();

      // check if a user already exists, if not create a new user
      const alreadyExists = await User.findOne({ email: profile.email });

      if (!alreadyExists) {
        User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture,
        });
      }

      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  },
});

export { handleGoogleAuth as GET, handleGoogleAuth as POST };
