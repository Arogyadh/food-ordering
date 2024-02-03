"use client";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Left from "@/components/icons/Left";
import { redirect, useParams, useRouter } from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm";

export default function EditMenuItemPage() {
  const router = useRouter();
  const { id } = useParams();
  const { status, isAdmin } = useProfile();
  const [menuItem, setMenuItem] = useState(null);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setMenuItem(item);
      });
    });
  }, [id]);

  if (status === "loading" || isAdmin === null) {
    return "Loading...";
  }

  if (isAdmin === false) {
    return "Not an admin.";
  }
  async function handleMenuItemSubmit(ev, data) {
    ev.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        resolve();
      } else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Updating",
      success: <b>Item Updated!</b>,
      error: <b>Could not update!.</b>,
    });
    router.push("/menu-items");
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="mt-8 max-w-2xl mx-auto">
        <Link href={"/menu-items"} className="button">
          <span>
            <Left />
          </span>
          Show all menu items
        </Link>
      </div>
      <MenuItemForm
        router={router}
        menuItem={menuItem}
        onSubmit={handleMenuItemSubmit}
      />
    </section>
  );
}
