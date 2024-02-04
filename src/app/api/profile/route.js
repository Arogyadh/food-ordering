import mongoose from "mongoose";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import User from "@/models/User";

export async function PUT(req) {
  const data = await req.json();
  const { _id, email } = data;

  let filter = {};

  if (_id) {
    filter = { _id };
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    filter = { email };
  }
  await User.updateOne(filter, data, { runValidators: false });

  return Response.json(true);
}

export async function GET(req) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return Response.json({});
  }

  const user = await User.findOne({ email: email });

  return Response.json(user);
}
