"use client";
import { useState } from "react";
import { useEffect } from "react";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";

export default function MenuPage() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    fetch("/api/categories").then((res) =>
      res.json().then((categories) => setCategories(categories))
    );
    fetch("/api/menu-items").then((res) =>
      res.json().then((menuItems) => setMenuItems(menuItems))
    );
    setLoading(false);
  }, []);
  return (
    <section className="mt-16">
      {loading && (
        <div className="text-center my-12">Loading menu items... </div>
      )}
      {categories?.length > 0 &&
        categories.map((category) => (
          <div key={category._id}>
            <div className="text-center">
              <SectionHeaders mainHeader={category.name} />
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-6 mb-14">
              {menuItems
                .filter((menuItem) => menuItem.category === category._id)
                .map((item) => (
                  <MenuItem key={item._id} {...item} />
                ))}
            </div>
          </div>
        ))}
    </section>
  );
}
