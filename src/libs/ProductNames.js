import { Order } from "@/models/Order";
export async function ProductNames({ orderId }) {
  const order = await Order.findById(orderId);
  const productNames = order.cartProducts
    .map((cartProduct) => {
      const size = cartProduct?.size?.name;
      const extras = cartProduct?.extras
        .map((extra) => `<p>Extra-${extra.name}</p>`)
        .join("");

      return `<h2>${cartProduct.name}${size ? `-${size}` : ""}</h2>
                ${extras && extras.length > 0 ? `<p>${extras}</p>` : ""}
                <br />`;
    })
    .join("");

  return productNames;
}
