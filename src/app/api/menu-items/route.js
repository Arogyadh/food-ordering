import { MenuItems } from "@/models/MenuItems";
import mongoose from "mongoose";

export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL);
  const createdMenuItem = await MenuItems.create(body);
  return Response.json(createdMenuItem);
}
