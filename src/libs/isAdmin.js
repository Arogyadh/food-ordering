import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/AuthOptions";

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) return false;
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    return false;
  }
  return user.admin;
}
