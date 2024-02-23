import User from "@/models/User";
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async session(session, user) {
      return session;
    },
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        // mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email });

        if (!user) {
          console.error("User not found");
          return null;
        }
        const passwordOk = user && bcrypt.compareSync(password, user.password);
        if (passwordOk) {
          // console.log({ email, password, user });
          return { ...user };
        } else {
          console.error("Password incorrect");
          return null;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.SECRET,
};

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  console.log(session);
  if (!userEmail) return false;
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    return false;
  }
  return user.admin;
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
