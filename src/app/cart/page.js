"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Trash from "@/components/icons/Trash";
import AddressInputs from "../../components/layout/AddressInputs";
import { useProfile } from "../../components/UseProfile";

export default function CartPage() {
  const { cartProducts, clearCart, removeFromCart } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

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
  let total = 0;
  for (const p of cartProducts) {
    total += cartProductPrice(p);
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader={"Cart"} />
      </div>

      <div className="grid grid-cols-2 gap-12 mt-8 ">
        <div>
          {cartProducts?.length === 0 && (
            <div>No Products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-3 mb-2 border-b text-start items-center py-2"
              >
                <div className="w-24">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={240}
                    height={240}
                    className="rounded-lg"
                  />
                </div>

                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  {product?.size && (
                    <span className="text-sm">Size: {product.size.name}</span>
                  )}
                  {product?.extras.length > 0 && (
                    <div className="text-sm text-gray-500">
                      {product.extras.map((extra, index) => (
                        <span key={index} className="flex text-start">
                          {extra.name} Rs.{extra.price}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-center text-lg font-semibold">
                  Rs.{cartProductPrice(product)}
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(index)}
                    className="p-2"
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          <div className="py-4 text-right text-gray-500 font-bold">
            Total :
            <span className="text-lg ml-2 text-black items-center">
              Rs.{total}
            </span>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-xl">
          <h2>Checkout</h2>
          <form>
            <AddressInputs
              addressProps={address}
              setAddressProps={handleAddressChange}
            />
            <button type="submit">Pay Rs.{total}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
