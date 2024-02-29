"use client";
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";
import { set } from "mongoose";

export default function HomeMenu() {
  const [loading, setLoading] = useState(true);
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    fetch("/api/menu-items").then((response) => {
      response.json().then((menuItems) => {
        setBestSellers(menuItems.slice(-6));
      });
    });
    setLoading(false);
  }, []);
  return (
    <section>
      <div className="text-center mt-20 mb-8">
        <SectionHeaders
          subHeader={"Check Out"}
          mainHeader={"Our New Additions"}
        />
      </div>
      {loading && <div className="text-center ">Loading...</div>}
      <div className="grid grid-cols-3 gap-4">
        {bestSellers?.length > 0 &&
          bestSellers.map((item) => <MenuItem key={item._id} {...item} />)}
      </div>
    </section>
  );
}
