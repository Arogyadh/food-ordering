"use client";
import { useProfile } from "@/components/UseProfile";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Left from "@/components/icons/Left";
import MenuItemForm from "@/components/layout/MenuItemForm";
import { useRouter } from "next/navigation";

export default function NewMenuItemPage() {
  const { status, isAdmin } = useProfile();
  const router = useRouter();

  if (status === "loading" || isAdmin === null) {
    return "Loading...";
  }

  if (isAdmin === false) {
    return "Not an admin.";
  }
  async function handleMenuItemSubmit(ev, data) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        resolve();
      } else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: <b>Item Saved!</b>,
      error: <b>Could not save.</b>,
    });

    router.push("/menu-items");
  }
  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="mt-8 max-w-lg mx-auto">
        <Link href={"/menu-items"} className="button">
          <span>
            <Left />
          </span>
          Show all menu items
        </Link>
      </div>
      <MenuItemForm menuItem={null} onSubmit={handleMenuItemSubmit} />
    </section>
  );
}
