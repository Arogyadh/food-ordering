"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Header = () => {
  const session = useSession();
  console.log(session);
  const status = session.status;
  const userData = session?.data?.user;

  console.log(status);

  return (
    <header className="flex items-center justify-between">
      <nav className="flex gap-8 items-center text-gray-500 font-semibold">
        <Link href="" className="text-primary font-semibold text-2xl">
          ST PIZZA
        </Link>
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <nav className="flex gap-4 items-center text-gray-500 font-semibold">
        {status === "authenticated" && (
          <>
            <Link
              href={"/profile"}
              className="whitespace-nowrap px-4 py-2 rounded-full"
            >
              Hello,{" "}
              {userData &&
                (userData.name?.split(" ")[0] ||
                  userData.email?.split("@")[0] ||
                  User)}
            </Link>
            <button
              onClick={() => {
                signOut();
              }}
              className="bg-primary rounded-full text-white px-8 py-2"
            >
              Logout
            </button>
          </>
        )}
        {status !== "authenticated" && (
          <>
            <Link href={"/register"}>Register</Link>
            <Link
              href={"/login"}
              className="bg-primary rounded-full text-white px-8 py-2"
            >
              Login
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
