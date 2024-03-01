"use client";
import { useState } from "react";
import { useEffect } from "react";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";

export default function MenuPage() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Pizza");
  useEffect(() => {
    fetch("/api/categories").then((res) =>
      res.json().then((categories) => setCategories(categories))
    );
    fetch("/api/menu-items").then((res) =>
      res.json().then((menuItems) => setMenuItems(menuItems))
    );
    setLoading(false);
  }, []);

  function handleActiveCategory(name) {
    console.log(name);
    setActiveCategory(name);
  }
  return (
    <section className="mt-16 flex flex-col ">
      {loading && (
        <div className="text-center my-12">Loading menu items... </div>
      )}

      <div className="flex flex-wrap  gap-5 md:justify-between">
        {categories?.length > 0 &&
          categories.map((category) => (
            <div className="max-w-xs " key={category._id}>
              <div
                onClick={() => handleActiveCategory(category.name)}
                className={`items-center text-center button bg-gray-200 cursor-pointer hover:bg-gray-300 ${
                  category.name === activeCategory ? "activeMenu" : ""
                }`}
              >
                <span>{category.name}</span>
              </div>
            </div>
          ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4 my-8">
        {categories?.length > 0 &&
          categories.map((category) => (
            <>
              {category.name === activeCategory && (
                <>
                  {menuItems
                    .filter((menuItem) => menuItem.category === category._id)
                    .map((item) => (
                      <MenuItem key={item._id} {...item} />
                    ))}
                </>
              )}
            </>
          ))}
      </div>
    </section>
  );
}
