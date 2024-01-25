import mongoose from "mongoose";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import User from "@/models/User";

export async function PUT(req) {
  const data = await req.json();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return Response.json({});
  }

  await User.updateOne({ email: email }, data, { runValidators: false });

  return Response.json(true);
}
