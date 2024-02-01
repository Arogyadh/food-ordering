"use client";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Image from "next/image";
import Link from "next/link";
import { React, useEffect, useState } from "react";

export default function MenuItemsPage() {
  const { status, isAdmin } = useProfile();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (status === "loading" || isAdmin === null) {
    return "Loading...";
  }

  if (isAdmin === false) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={isAdmin} />
      <Link href="/menu-items/new" className="button flex">
        <span>Add New Menu Item</span>
        <Right />
      </Link>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Edit menu:</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((menuItem, index) => (
              <Link
                href={"/menu-items/edit/" + menuItem._id}
                key={index}
                className="bg-gray-200 rounded-xl p-4"
              >
                <div className="relative flex justify-center">
                  <Image
                    className="rounded-md"
                    src={menuItem.image}
                    alt={menuItem.name}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="text-center">{menuItem.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
