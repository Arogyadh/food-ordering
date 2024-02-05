"use client";
import { useProfile } from "@/components/UseProfile";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function EditUserPage() {
  const session = useSession();

  const { status, isAdmin } = useProfile();
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch("/api/users").then((res) => {
      res.json().then((users) => {
        const user = users.find((u) => u._id === id);
        setUser(user);
      });
    });
  }, [id]);

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();

    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, _id: id }),
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: "Saving...",
      success: "Saved!",
      error: "Error",
    });
  }

  if (status === "loading" || isAdmin === null || user === null) {
    return "Loading...";
  }

  if (isAdmin === false) {
    return "Not an admin.";
  }
  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <UserTabs isAdmin={isAdmin} />
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
}
