"use client";

import { useSession } from "next-auth/react";
import EditableImage from "@/components/layout/EditableImage";
import { redirect } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";

export default function ProfilePage() {
  const session = useSession();
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  const status = session.status;

  useEffect(() => {
    if (status === "authenticated") {
      setUsername(session.data.user.name);
      setImage(session.data.user.image);
      setPhone(session.data.user.phone);
      setStreetAddress(session.data.user.streetAddress);
      setCity(session.data.user.city);
      setCountry(session.data.user.country);
      setZip(session.data.user.zip);
      setIsAdmin(session.data.user.admin);
      setProfileFetched(true);
    }
  }, [status, session]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: username,
          image: image,
          phone: phone,
          streetAddress: streetAddress,
          city: city,
          country: country,
          zip: zip,
        }),
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });
    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: <b>Settings saved!</b>,
      error: <b>Could not save.</b>,
    });
  }

  if (status === "loading" || profileFetched === false) {
    return "Loading...";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />

      <div className="max-w-md mx-auto">
        <div className="flex gap-4">
          <div>
            <div className=" rounded-md relative max-w-[100px]">
              <EditableImage link={image} setLink={setImage} />
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <label>Name</label>
            <input
              type="text"
              placeholder="Name"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
            />
            <label>Email</label>
            <input type="text" value={session.data.user.email} disabled />
            <label>Phone</label>
            <input
              type="tel"
              placeholder="Phone Number"
              onChange={(ev) => setPhone(ev.target.value)}
              value={phone}
            />
            <label>Street Address</label>
            <input
              type="text"
              placeholder="Street Adress"
              value={streetAddress}
              onChange={(ev) => setStreetAddress(ev.target.value)}
            />
            <label>City</label>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(ev) => setCity(ev.target.value)}
              />
              <label>Zip</label>
              <input
                type="text"
                placeholder="Zip/Postal Code"
                value={zip}
                onChange={(ev) => setZip(ev.target.value)}
              />
            </div>
            <label>Country</label>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(ev) => setCountry(ev.target.value)}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
