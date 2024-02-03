import { Category } from "@/models/Category";
import { MenuItems } from "@/models/MenuItems";
import mongoose from "mongoose";

export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL);
  const createdCategory = await Category.create(body);
  return Response.json(true);
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { _id, name } = await req.json();
  await Category.updateOne({ _id }, { name });
  return Response.json(true);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  return Response.json(await Category.find());
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { _id } = await req.json();
  const menuItemsWithCategory = await MenuItems.find({ category: _id });
  // console.log(menuItemsWithCategory);

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
}
