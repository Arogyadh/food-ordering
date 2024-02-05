"use client";
import { useState } from "react";
import { useEffect } from "react";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/menuItem";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    fetch("/api/categories").then((res) =>
      res.json().then((categories) => setCategories(categories))
    );
    fetch("/api/menu-items").then((res) =>
      res.json().then((menuItems) => setMenuItems(menuItems))
    );
  }, []);
  return (
    <section className="mt-8">
      {categories?.length > 0 &&
        categories.map((category) => (
          <div>
            <div className="text-center">
              <SectionHeaders mainHeader={category.name} />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 mb-14">
              {menuItems
                .filter((menuItem) => menuItem.category === category._id)
                .map((item) => (
                  <MenuItem {...item} />
                ))}
            </div>
          </div>
        ))}
    </section>
  );
}
