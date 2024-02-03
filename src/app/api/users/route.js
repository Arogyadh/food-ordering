import User from "@/models/User";
import mongoose from "mongoose";

export async function GET() {
  try {
    mongoose.connect(process.env.MONGO_URL);
    const users = await User.find();

    return Response.json(users);
  } catch (error) {
    console.error(error);
    return Response.json(false);
  }
}
