"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { CartContext } from "@/components/AppContext";
import ShoppingCart from "@/components/icons/ShoppingCart";
import Hamburger from "@/components/icons/Hamburger";
import UserCircle from "@/components/icons/UserCircle";
import Image from "next/image";
function AuthLinks({ status, userData }) {
  if (status === "authenticated") {
    return (
      <>
        <Link
          href={"/profile"}
          className="whitespace-nowrap flex px-4 py-2 rounded-full"
        >
          <UserCircle />
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
    );
  }

  if (status !== "authenticated") {
    return (
      <>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="p-2 rounded-full justify-center items-center"
        >
          <Image src={"/google.png"} alt="google" width={30} height={30} />
          Login
        </button>
      </>
    );
  }
}

const Header = () => {
  const session = useSession();

  const status = session.status;
  const { cartProducts } = useContext(CartContext);
  const userData = session?.data?.user;
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header>
      <div className="flex md:hidden justify-between">
        <Link href="/" className="text-primary font-semibold text-2xl">
          TC<sup className="text-sm">2</sup>
        </Link>
        <div className="flex gap-4 items-center">
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
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="p-1 "
          >
            <Hamburger />
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="md:hidden p-4 gap-4  rounded-xl mt-6 flex flex-col items-center"
          style={{
            background: "linear-gradient(180deg, #f9f9f9 0%, #f9ea94 100%)",
          }}
        >
          <Link className="relative" href="/">
            <span className="hover-over">Home</span>
          </Link>
          <Link className="relative" href="/menu">
            <span className="hover-over">Menu</span>
          </Link>
          <Link className="relative" href="/#about">
            <span className="hover-over">About</span>
          </Link>
          <Link className="relative" href="/#contact">
            <span className="hover-over">Contact</span>
          </Link>

          <AuthLinks status={status} userData={userData} />
        </div>
      )}

      <div className="hidden  md:flex items-center justify-between">
        <nav className="flex gap-8 items-center text-gray-500 font-semibold">
          <Link href="/" className="text-primary font-semibold text-2xl">
            TC<sup className="text-sm">2</sup>
          </Link>
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <nav className="flex gap-4 items-center text-gray-500 font-semibold">
          <AuthLinks status={status} userData={userData} />

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
      </div>
    </header>
  );
};

export default Header;
