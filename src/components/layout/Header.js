"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext } from "react";
import { CartContext } from "@/components/AppContext";
import ShoppingCart from "@/components/icons/ShoppingCart";

const Header = () => {
  const session = useSession();
  // console.log(session);
  const status = session.status;
  const { cartProducts } = useContext(CartContext);
  const userData = session?.data?.user;

  // console.log(status);

  return (
    <header className="flex items-center justify-between">
      <nav className="flex gap-8 items-center text-gray-500 font-semibold">
        <Link href="" className="text-primary font-semibold text-2xl">
          ST PIZZA
        </Link>
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact">Contact</Link>
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

        <Link href={"/cart"}>
          <div className="relative items-center">
            <ShoppingCart />
            {cartProducts.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-primary text-white p-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </div>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
