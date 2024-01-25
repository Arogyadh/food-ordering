"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function UserTabs({ isAdmin }) {
  const path = usePathname();
  console.log(path);
  return (
    <div className="flex tabs gap-2 justify-center mb-8">
      <Link className={path === "/profile" ? "active" : ""} href={"/profile"}>
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            className={path === "/categories" ? "active" : ""}
            href={"/categories"}
          >
            Categories
          </Link>
          <Link
            className={path === "/menu-items" ? "active" : ""}
            href={"/menu-items"}
          >
            Menu Items
          </Link>
          <Link className={path === "/users" ? "active" : ""} href={"/users"}>
            Users
          </Link>
        </>
      )}
    </div>
  );
}