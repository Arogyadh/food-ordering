"use client";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";

export default function EditUserPage() {
  const { status, isAdmin } = useProfile();
  if (status === "loading" || isAdmin === null) {
    return "Loading...";
  }

  if (isAdmin === false) {
    return "Not an admin.";
  }
  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <UserTabs isAdmin={isAdmin} />
    </section>
  );
}
