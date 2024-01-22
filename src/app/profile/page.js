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
  const [image, setImage] = useState("");
  const status = session.status;

  useEffect(() => {
    if (status === "authenticated") {
      setUsername(session.data.user.name);
      setImage(session.data.user.image);
    }
  }, [status, session]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();
    setisSaving(true);
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: username, image: image }),
    });
    setisSaving(false);
    if (response.ok) {
      setSaved(true);
    }
  }
  async function handleFileChange(ev) {
    const files = ev?.target?.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });
        const link = await response.json();
        setImage(link);

        if (response.ok) {
          console.log("File uploaded successfully");
        } else {
          console.error("File upload failed");
        }
      } catch (error) {
        console.error("Error during file upload:", error);
      }
    }
  }

  if (status === "loading") {
    return "Loading...";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }

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
            <div className=" rounded-md relative max-w-[100px]">
              {image && (
                <Image
                  className="rounded-md w-full h-full mb-2"
                  src={image}
                  alt="profile picture"
                  width={250}
                  height={250}
                />
              )}

              <label>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <span className="block border border-gray-300 cursor-pointer hover:bg-gray-200 text-center rounded-lg p-2">
                  Edit
                </span>
              </label>
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
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
