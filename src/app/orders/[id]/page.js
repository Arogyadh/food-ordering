"use client";
import { CartContext } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { cartProductPrice } from "../../../components/AppContext";

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);

  useEffect(() => {
    setLoadingOrder(true);
    if (typeof window !== undefined) {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
        toast.success("Your order has been placed ");
      }
    }
    if (id) {
      setLoadingOrder(true);
      fetch("/api/orders?_id=" + id).then((res) => {
        res.json().then((orderData) => {
          setOrder(orderData);
        });
      });
      setLoadingOrder(false);
    }
  }, []);

  let subTotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subTotal += cartProductPrice(product);
    }
  }
  return (
    <section className="max-w-4xl mt-8 mx-auto">
      <div className="text-center mb-8">
        <SectionHeaders mainHeader="Your Order" />
        <div className="my-4">Thank you for your order!</div>
      </div>
      {loadingOrder && <div>Loading this order details...</div>}
      {order && (
        <div className="grid grid-cols-2 gap-16">
          <div>
            {order.cartProducts.map((product, index) => (
              <CartProduct product={product} key={index} />
            ))}
            <div className="text-right">
              <div className="text-gray-500">
                Subtotal :{" "}
                <span className="font-bold text-black">Rs. {subTotal}</span>
              </div>
              <div className="text-gray-500">
                Delivery : <span className="font-bold text-black">Rs. 100</span>
              </div>
              <div className="text-gray-500">
                Total :{" "}
                <span className="font-bold text-black">
                  Rs. {subTotal + 100}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl">
            <AddressInputs disabled addressProps={{ ...order }} />
          </div>
        </div>
      )}
    </section>
  );
}
