"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(response);
    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }

    setCreatingUser(false);
  }
  return (
    <section className="mt-8">
      <h1 className="mt-8 text-center text-primary text-4xl mb-5">Register</h1>
      {userCreated && (
        <div className="my-4 text-center ">
          User Created.
          <br /> Now you can &raquo;{" "}
          <Link className="underline" href={"/login"}>
            Login{" "}
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center text-red-500 font-semibold">
          An Error occoured .<br />
          Please Try Again.
        </div>
      )}
      <form className="block max-w-[80%] mx-auto " onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          disabled={creatingUser}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={creatingUser}
        />
        <button type="submit" disabled={creatingUser}>
          Register
        </button>
        <div className="my-4 text-gray-700 text-center">
          or Login with Provider
        </div>
        <button
          type="button"
          className="flex gap-4 justify-center items-center"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <Image src={"/google.png"} alt="google" width={30} height={30} />
          Login with google
        </button>
        <div className="text-center my-4 text-gray-500">
          Have an account? &raquo;{" "}
          <Link className="underline" href={"/login"}>
            Login here
          </Link>
        </div>
      </form>
    </section>
  );
}
