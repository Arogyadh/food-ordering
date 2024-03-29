"use client";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const { status, isAdmin } = useProfile();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users").then((response) => {
      response.json().then((users) => {
        setUsers(users);
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
    <section className="max-w-2xl mx-auto mt-8">
      <UserTabs isAdmin={isAdmin} />

      <div className="font-bold">
        {users?.length > 0 &&
          users.map((user, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg mb-2 p-2 px-4 flex  items-center gap-4"
            >
              <div className="flex flex-col md:grid md:grid-cols-2 gap-2 md:gap-4 grow">
                <div className="text-gray-900 flex items-center gap-2">
                  {!!user.name && <span>{user.name}</span>}
                  {!!user.admin && (
                    <span className=" bg-green-500 rounded-full h-2 w-2  items-center justify-center text-white"></span>
                  )}
                  {!user.name && <span className="italic">No Name</span>}
                </div>
                <span className="text-gray-500">{user.email}</span>
              </div>

              <div>
                <Link className="button" href={"/users/" + user._id}>
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
