import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/AuthOptions";
import { isAdmin } from "@/libs/isAdmin";

import { Order } from "@/models/Order.js";

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const admin = await isAdmin();
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  const email = url.searchParams.get("email");

  if (email) {
    if (admin) {
      return Response.json(await Order.find({ userEmail: email }));
    } else {
      return Response.json(await Order.find({ userEmail }));
    }
  }

  if (_id) {
    return Response.json(await Order.findById(_id));
  }

  if (admin) {
    return Response.json(await Order.find());
  }
  if (userEmail) {
    return Response.json(await Order.find({ userEmail }));
  }
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const admin = await isAdmin();

  const body = await req.json();

  await Order.findByIdAndUpdate(body._id, body);

  return Response.json(true);
}
