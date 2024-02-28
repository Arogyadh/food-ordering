"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";

import { useContext, useEffect, useState } from "react";

import AddressInputs from "../../components/layout/AddressInputs";
import { useProfile } from "../../components/UseProfile";
import { toast } from "react-hot-toast";
import CartProduct from "@/components/menu/CartProduct";

export default function CartPage() {
  const { cartProducts, removeFromCart } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("cancelled=1")) {
        toast.error("Payment cancelled");
      }
    }
  }, []);
  useEffect(() => {
    if (profileData?.user) {
      const { phone, streetAddress, city, country, zip } = profileData?.user;
      const addressFromProfile = { phone, streetAddress, city, country, zip };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => {
      return { ...prevAddress, [propName]: value };
    });
  }
  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }

  async function proceedToCheckout(ev) {
    ev.preventDefault();
    const promise = new Promise((resolve, reject) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address, cartProducts }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });
    await toast.promise(promise, {
      loading: "Processing...",
      success: "Redirecting to payment",
      error: "Checkout failed",
    });
  }
  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader={"Cart"} />
        <p className="text-gray-600 my-4">Your Shopping Cart is empty :{"("}</p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader={"Cart"} />
      </div>

      <div className="grid md:grid-cols-2 gap-12 mt-8 ">
        <div>
          {cartProducts?.length === 0 && (
            <div>No Products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <CartProduct
                key={index}
                product={product}
                onRemove={removeFromCart}
                index={index}
              />
            ))}
          <div className="py-2 text-right text-gray-500 font-bold">
            Total :
            <span className="text-lg ml-2 text-black items-center">
              Rs.{subtotal}
            </span>
          </div>
          <div className=" text-right text-gray-500 font-bold">
            Delivery Charges :
            <span className="text-lg ml-2 text-black items-center">
              Rs. 100
            </span>
          </div>
          <div className=" text-right text-gray-500 font-bold">
            Total :
            <span className="text-lg ml-2 text-black items-center">
              Rs. {subtotal + 100}
            </span>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-xl">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProps={handleAddressChange}
            />
            <button type="submit">Pay Rs.{subtotal + 100}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
