import mongoose from "mongoose";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { getServerSession } from "next-auth";
import User from "@/models/User";

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const session = await getServerSession(authOptions);
  const email = session.user.email;
  console.log({ email, data });

  if ("name" in data) {
    //update name by new name

    await User.updateOne(
      { email: email },
      { $set: { name: data.name } },
      { runValidators: false }
    );
  }

  return Response.json(true);
}
