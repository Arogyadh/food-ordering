"use client";
import { useProfile } from "@/components/UseProfile";
import SectionHeaders from "@/components/layout/SectionHeaders";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { use, useEffect } from "react";
import { useState } from "react";

export default function OrdersPage() {
  let numbers = -6;
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { status, isAdmin } = useProfile();
  function fetchOrders() {
    setLoadingOrders(true);
    fetch("/api/orders").then((res) => {
      res.json().then((order) => {
        setOrders(order.slice(numbers).reverse());
      });
    });
    setLoadingOrders(false);
  }
  useEffect(() => {
    fetchOrders();
  }, [numbers]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated")
    return <div>Please login to view your orders</div>;

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={isAdmin} />
      <div className="mt-8">
        {loadingOrders && <div>Loading Orders...</div>}
        {orders?.length > 0 &&
          orders.map((order, index) => (
            <div
              key={index}
              className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:grid grid-cols-3 items-center"
            >
              <div>
                <div>{order.userEmail}</div>
              </div>
              <div className="text-gray-500 text-sm">
                {order.cartProducts?.map((p) => p.name).join(", ")}
              </div>

              <div className="flex gap-2 flex-col items-center justify-center text-sm">
                <div
                  className={
                    (order.paid ? "bg-green-500" : "bg-red-400") +
                    " p-3 rounded-xl w-20 text-center"
                  }
                >
                  {order.paid ? "Paid" : "Not Paid"}
                </div>

                <div className="text-center text-sm text-gray-500 ">
                  {order.createdAt.replace("T", " ").substring(0, 16)}
                </div>
                <div>
                  <Link
                    className="button hover:bg-gray-200"
                    href={"/orders/" + order._id}
                  >
                    Show more
                  </Link>
                </div>
              </div>
            </div>
          ))}

        <div>
          <button
            className="button bg-gray-300 hover:bg-gray-200"
            onClick={() => {
              numbers = numbers - 6;
              fetchOrders();
            }}
          >
            Show more
          </button>
        </div>
      </div>
    </section>
  );
}
