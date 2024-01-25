import { Category } from "@/models/Category";
import mongoose from "mongoose";

export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL);
  const createdCategory = await Category.create(body);
  return Response.json(true);
}
