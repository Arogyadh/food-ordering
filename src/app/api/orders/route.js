import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/AuthOptions";
import { isAdmin } from "@/libs/isAdmin";
import sendEmail from "@/libs/sendEmail";
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

  const admin = await isAdmin();

  const body = await req.json();

  if (admin) {
    const { userEmail } = await Order.findById(body._id);
    await Order.findByIdAndUpdate(body._id, body);
    await sendEmail(
      userEmail,
      `Order Status Updated-${body.status}`,
      "<p>Hello, your order has been confirmed and will be on its way soon!</p>"
    );
    return Response.json(true);
  }
}
