import { Order } from "@/models/Order";
import sendEmail from "@/libs/sendEmail";

const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  let event;

  try {
    const reqBuffer = await req.text();
    const signSecret = process.env.STRIPE_SIGN_SECRET;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
  } catch (e) {
    console.error("stripe error");

    return Response.json(e, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const orderId = event?.data?.object?.metadata?.orderId;
    const isPaid = event?.data?.object?.payment_status === "paid";
    const email = event?.data?.object?.metadata?.customer_email;

    if (isPaid) {
      await Order.updateMany(
        { _id: orderId },
        { $set: { paid: true, status: "queue" } }
      );
      const order = await Order.findById(orderId);
      const productNames = order.cartProducts
        .map((cartProduct) => {
          // Check if the cartProduct size and extras are defined
          const size = cartProduct.size?.name;
          const extras = cartProduct.extras
            ?.map((extra) => extra.name)
            .join(", ");

          // Render product name, size, and extras only if they are defined
          return `<h2>${cartProduct.name}</h2>
                ${size ? `<p>${size}</p>` : ""}
                ${extras ? `<p>Extra-${extras}</p>` : ""}
                <br />`;
        })
        .join("");

      await sendEmail(
        email,
        "Order Confirmed-Queue",
        `<h1>Hello,</h1><p>Your order has been confirmed and will be on its way soon!<span>${productNames}</span></p>`
      );
    }
  }

  return Response.json("ok", { status: 200 });
}
