import mongoose from "mongoose";
import { Order } from "../../../models/Order";
const stripe = require("stripe")(process.env.STRIPE_SK);
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/AuthOptions";
import { MenuItems } from "../../../models/MenuItems";


export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { cartProducts, address } = await req.json();

  const session = await getServerSession(authOptions);

  const userEmail = session?.user?.email;
  // console.log(userEmail);

  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });

  const stripeLineItems = [];
  for (const cartProduct of cartProducts) {
    const productName = cartProduct.name;
    const productInfo = await MenuItems.findById(cartProduct._id);
    let productPrice = productInfo.basePrice;
    if (cartProduct.size) {
      const size = productInfo.sizes.find(
        (size) => size._id.toString() === cartProduct.size._id.toString()
      );
      productPrice += size.price;
    }
    if (cartProduct.extras.length > 0) {
      for (const cartProductExtraThing of cartProduct.extras) {
        const extraThingInfo = productInfo.extraIngridientPrices.find(
          (extra) =>
            extra._id.toString() === cartProductExtraThing._id.toString()
        );
        productPrice += extraThingInfo.price;
      }
    }

    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: productName,
        },
        unit_amount: Math.round(productPrice),
      },
    });
  }

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: "payment",
    customer_email: userEmail,
    success_url:
      process.env.NEXTAUTH_URL +
      "orders/" +
      orderDoc._id.toString() +
      "?clear-cart=1",
    cancel_url: process.env.NEXTAUTH_URL + "cart?cancelled=1",
    metadata: { orderId: orderDoc._id.toString() },
    payment_intent_data: {
      metadata: { orderId: orderDoc._id.toString() },
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 100, currency: "usd" },
          display_name: "Delivery fee",
        },
      },
    ],
  });
  return Response.json(stripeSession.url);
}
