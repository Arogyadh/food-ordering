import { MenuItems } from "@/models/MenuItems";
import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const body = await req.json();
  if (await isAdmin()) {
    const createdMenuItem = await MenuItems.create(body);
    return Response.json(createdMenuItem);
  } else {
    return Response.json({ message: "You are not admin" });
  }
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  if (await isAdmin()) {
    const { _id, ...data } = await req.json();
    const updatedMenuItem = await MenuItems.findByIdAndUpdate(_id, data);
    return Response.json(updatedMenuItem);
  } else {
    return Response.json({ message: "You are not admin" });
  }
}

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);
  const menuItems = await MenuItems.find({});
  return Response.json(menuItems);
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { _id } = await req.json();
  if (await isAdmin()) {
    await MenuItems.deleteOne({ _id });
    return Response.json(true);
  } else {
    return Response.json({ message: "You are not admin" });
  }
}
