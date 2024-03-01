"use client";
import { CartContext } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { cartProductPrice } from "../../../components/AppContext";

import OrderStatus from "@/components/layout/OrderStatus";

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [status, setStatus] = useState("");

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
          setStatus(orderData.status);
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
      <div className="text-center mb-4">
        <SectionHeaders mainHeader="Your Order" />
      </div>
      {loadingOrder && <div>Loading this order details...</div>}
      {order && (
        <>
          <div className="flex justify-center items-center text-lg">
            {order.status === "cooking" && <OrderStatus status={status} />}
            {order.status === "delivering" && (
              // <div className="text-gray-500">
              //   <div className="flex items-center gap-5">
              //     <div className="h-10 w-10">
              //       <Image
              //         style={{ transform: "scaleX(-1)" }}
              //         src={
              //           "https://arogya-ordering.s3.ap-southeast-1.amazonaws.com/delivering.png"
              //         }
              //         alt="cooking"
              //         height={50}
              //         width={50}
              //       />
              //     </div>
              //     Your order is on its way !
              //     <div className="h-10 w-10">
              //       <Image
              //         src={
              //           "https://arogya-ordering.s3.ap-southeast-1.amazonaws.com/delivering.png"
              //         }
              //         alt="cooking"
              //         height={50}
              //         width={50}
              //       />
              //     </div>
              //   </div>
              // </div>
              <OrderStatus status={status} />
            )}
            {order.status === "delivered" && (
              // <div className="text-gray-500">
              //   <div className="flex items-center gap-5">
              //     <div className="h-10 w-10">
              //       <Image
              //         style={{ transform: "scaleX(-1)" }}
              //         src={
              //           "https://arogya-ordering.s3.ap-southeast-1.amazonaws.com/delivered.png"
              //         }
              //         alt="cooking"
              //         height={50}
              //         width={50}
              //       />
              //     </div>
              //     Your order has been delivered !
              //     <div className="h-10 w-10">
              //       <Image
              //         src={
              //           "https://arogya-ordering.s3.ap-southeast-1.amazonaws.com/delivered.png"
              //         }
              //         alt="cooking"
              //         height={50}
              //         width={50}
              //       />
              //     </div>
              //   </div>
              // </div>
              <OrderStatus status={status} />
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-4 md:gap-16">
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
                  Delivery :{" "}
                  <span className="font-bold text-black">Rs. 100</span>
                </div>
                <div className="text-gray-500">
                  Total :{" "}
                  <span className="font-bold text-black">
                    Rs. {subTotal + 100}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl">
              <AddressInputs disabled addressProps={{ ...order }} />
            </div>
          </div>
        </>
      )}
    </section>
  );
}
