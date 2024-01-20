"use client";
import { set } from "mongoose";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function ProfilePage() {
  const session = useSession();
  const [username, setUsername] = useState("");
  const [saved, setSaved] = useState(false);
  const [isSaving, setisSaving] = useState(false);
  const status = session.status;

  useEffect(() => {
    if (status === "authenticated") {
      setUsername(session.data.user.name);
    }
  }, [status, session]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();
    setisSaving(true);
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: username }),
    });
    setisSaving(false);
    if (response.ok) {
      setSaved(true);
    }
  }

  if (status === "loading") {
    return "Loading...";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }
  const userImage = session.data.user.image;

  return (
    <section className="mt-8">
      <h1 className="mt-8 text-center text-primary text-4xl mb-5">Profile</h1>
      <div className="max-w-md mx-auto">
        {saved && (
          <h2 className="text-center rounded-lg bg-green-200 p-4 border border-green-300">
            Profile Saved!
          </h2>
        )}
        {isSaving && (
          <h2 className="text-center rounded-lg bg-green-200 p-4 border border-green-300">
            Saving...
          </h2>
        )}
        <div className="flex gap-4 items-center">
          <div>
            <div className=" rounded-md relative">
              <Image
                className="rounded-md w-full h-full mb-2"
                src={userImage}
                alt="profile picture"
                width={250}
                height={250}
              />

              <button type="button">Edit</button>
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <input
              type="text"
              placeholder="Name"
              value={username}
              disabled={isSaving}
              onChange={(ev) => setUsername(ev.target.value)}
            />
            <input type="text" value={session.data.user.email} disabled />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
}
