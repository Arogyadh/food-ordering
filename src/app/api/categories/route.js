import { Category } from "@/models/Category";
import { MenuItems } from "@/models/MenuItems";
import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL);
  if (await isAdmin()) {
    const createdCategory = await Category.create(body);
    return Response.json(true);
  } else {
    return Response.json({ messge: "You are not admin" });
  }
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  if (await isAdmin()) {
    const { _id, name } = await req.json();
    await Category.updateOne({ _id }, { name });
    return Response.json(true);
  } else {
    return Response.json({ message: "You are not admin" });
  }
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);

  return Response.json(await Category.find());
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  if (await isAdmin()) {
    const { _id } = await req.json();
    const menuItemsWithCategory = await MenuItems.find({ category: _id });

    if (menuItemsWithCategory.length > 0) {
      // If there are menu items, do not delete the category
      return Response.json({
        success: false,
        message: "Category has associated menu items.",
      });
    }
    await Category.deleteOne({ _id });
    return Response.json({
      success: true,
      message: "Category has been deleted.",
    });
  } else {
    return Response.json({ message: "You are not admin" });
  }
}
