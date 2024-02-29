"use client";
import { useEffect, useState } from "react";
import AddToCartButton from "./AddToCartButton";

export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, description, name, basePrice, sizes, extraIngridientPrices } =
    item;
  const hasSizesOrExtras =
    sizes?.length > 0 || extraIngridientPrices?.length > 0;
  const [onMenu, setOnMenu] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("menu")) {
        setOnMenu(true);
      }
    }
  }, []);

  return (
    <div className="p-[2.5px] bg-black rounded-sm">
      <div
        style={{
          background: "linear-gradient(180deg,#f9ea94  0%,#f9f9f9  100%)",
        }}
        className=" p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all"
      >
        <div className="text-center">
          <img
            src={image}
            alt={name}
            className=" max-h-[100px] block mx-auto"
          />
        </div>

        <h4 className="text-xl font-semibold my-3">{name}</h4>
        <p className="text-sm text-gray-500 line-clamp-3">{description}</p>
        {onMenu && (
          <AddToCartButton
            image={image}
            hasSizesOrExtras={hasSizesOrExtras}
            onClick={onAddToCart}
            basePrice={basePrice}
          />
        )}
      </div>
    </div>
  );
}
