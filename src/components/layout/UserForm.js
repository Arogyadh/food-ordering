"use client";
import EditableImage from "@/components/layout/EditableImage";
import { useState } from "react";
import { useProfile } from "../UseProfile";

export default function UserForm({ session, user, onSave }) {
  const { isAdmin: loggedInUserAdmin } = useProfile();
  const [username, setUsername] = useState(
    user?.name || session?.data?.user.name || ""
  );
  const [image, setImage] = useState(
    user?.image || session?.data?.user.image || ""
  );
  const [phone, setPhone] = useState(
    user?.phone || session?.data?.user.phone || ""
  );
  const [streetAddress, setStreetAddress] = useState(
    user?.streetAddress || session?.data?.user.streetAddress || ""
  );
  const [city, setCity] = useState(
    user?.city || session?.data?.user.city || ""
  );
  const [country, setCountry] = useState(
    user?.country || session?.data?.user.country || ""
  );
  const [zip, setZip] = useState(user?.zip || session?.data?.user.zip || "");

  const [admin, setAdmin] = useState(user?.admin || false);
  return (
    <div className="flex gap-4">
      <div>
        <div className=" rounded-md relative max-w-[100px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={(ev) =>
          onSave(ev, {
            name: username,
            image,
            phone,
            streetAddress,
            city,
            country,
            zip,
            admin,
          })
        }
      >
        <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          value={user?.email || session?.data?.user.email}
          disabled
        />
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>City</label>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(ev) => setCity(ev.target.value)}
            />
          </div>
          <div>
            <label>Zip</label>
            <input
              type="text"
              placeholder="Zip/Postal Code"
              value={zip}
              onChange={(ev) => setZip(ev.target.value)}
            />
          </div>
        </div>
        <label>Country</label>
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(ev) => setCountry(ev.target.value)}
        />
        {loggedInUserAdmin && (
          <div>
            <label
              className="p-2 inline-flex items-center gap-2 mb-2"
              htmlFor="adminCheckBox"
            >
              <input
                className=""
                id="adminCheckBox"
                type="checkbox"
                value={"1"}
                checked={admin}
                onClick={(ev) => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
