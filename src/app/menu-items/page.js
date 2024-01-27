"use client";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { React, useState } from "react";
import { toast } from "react-hot-toast";

export default function MenuItemsPage() {
  const { status, isAdmin } = useProfile();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");

  if (status === "loading" || isAdmin === null) {
    return "Loading...";
  }

  if (isAdmin === false) {
    return "Not an admin.";
  }
  async function handleMenuItemSubmit(e) {
    e.preventDefault();
    const data = { image, name, description, basePrice };
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
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <form onSubmit={handleMenuItemSubmit} className="mt-8 max-w-md mx-auto">
        <div className="flex items-start gap-4">
          <div className=" rounded-md max-w-[200px] max-h-[100px]">
            <EditableImage link={image} setLink={setImage} />
          </div>
          <div className="grow">
            <label>Item Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            /<label>Base Price</label>
            <input
              type="text"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
            />
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </section>
  );
}
