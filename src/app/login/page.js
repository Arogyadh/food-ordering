"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Nanum_Myeongjo } from "next/font/google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
    setLoginInProgress(false);
  }

  return (
    <section className="mt-8">
      <h1 className="mt-8 text-center text-primary text-4xl mb-5">Login</h1>
      <form className="block max-w-[80%] mx-auto " onSubmit={handleFormSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          disabled={loginInProgress}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loginInProgress}
        />
        <button type="submit" disabled={loginInProgress}>
          Login
        </button>
        <div className="my-4 text-gray-700 text-center">
          or Login with Provider
        </div>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center items-center"
        >
          <Image src={"/google.png"} alt="google" width={30} height={30} />
          Login with google
        </button>
        <div className="text-center my-4 text-gray-500">
          Dont have an account? &raquo;{" "}
          <Link className="underline" href={"/register"}>
            Register here
          </Link>
        </div>
      </form>
    </section>
  );
}
