"use client";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function OrdersPage() {
  let numbers = -6;
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { session, status, isAdmin } = useProfile();

  async function handleSearch(e) {
    console.log(e.target.value);
    setSearchQuery(e.target.value);
    await fetch("/api/orders?email=" + e.target.value).then((res) => {
      res.json().then((order) => {
        setOrders(order.slice(numbers).reverse());
      });
    });
  }

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

  async function setChangeStatus(grabData) {
    const promise = new Promise(async (resolve, reject) => {
      const { e, ...order } = grabData;
      console.log(e.target.value);
      console.log(order._id);
      const response = await fetch("/api/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: order._id,
          status: e.target.value,
        }),
      });
      if (response.ok) {
        resolve();
        fetchOrders();
      } else {
        reject();
      }

      await toast.promise(promise, {
        pending: "Updating...",
        success: "Updated",
        error: "Failed :(",
      });
    });
  }

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated")
    return <div>Please login to view your orders</div>;

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={isAdmin} />
      <div className="mt-8">
        {loadingOrders && <div>Loading Orders...</div>}
        {/* Search Bar */}
        {isAdmin && (
          <div className=" bg-gray-200 my-2 rounded-xl">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => handleSearch(e)}
            />
          </div>
        )}
        {/* Orders  */}
        {orders?.length > 0 &&
          orders.map((order, index) => (
            <div
              key={index}
              className="bg-gray-200 mb-2 p-4 rounded-lg gap-8 flex flex-col md:grid grid-cols-3 items-center"
            >
              <div className="flex flex-col gap-2 text-center items-center">
                <div>{order.userEmail}</div>
                <div className="text-xs text-gray-500">
                  status :{order.status || " "}
                </div>
                {isAdmin && order.paid && (
                  <select
                    onChange={(e) => setChangeStatus({ e, ...order })}
                    className="text-xs w-[100px]"
                    value={order.status}
                  >
                    <option value="queue">Queue</option>
                    <option value="cooking">Cooking</option>
                    <option value="delivering">Delivering</option>
                    <option value="delivered">Delivered</option>
                  </select>
                )}
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
        {/* Show more */}
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
