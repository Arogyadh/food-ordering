import { MenuItems } from "@/models/MenuItems";
import mongoose from "mongoose";

export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL);
  const createdMenuItem = await MenuItems.create(body);
  return Response.json(createdMenuItem);
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { _id, ...data } = await req.json();
  const updatedMenuItem = await MenuItems.findByIdAndUpdate(_id, data);
  return Response.json(updatedMenuItem);
}

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);
  const menuItems = await MenuItems.find({});
  return Response.json(menuItems);
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { _id } = await req.json();
  await MenuItems.deleteOne({ _id });
  return Response.json(true);
}
