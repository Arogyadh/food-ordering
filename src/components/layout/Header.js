import Link from "next/link";
import React from "react";

const Header = () => {
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
        <Link href={"/register"}>Register</Link>
        <Link
          href={"/login"}
          className="bg-primary rounded-full text-white px-8 py-2"
        >
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Header;
