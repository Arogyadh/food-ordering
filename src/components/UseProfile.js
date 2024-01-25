"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export function useProfile() {
  const session = useSession();
  const status = session.status;
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setIsAdmin(session.data.user.admin);
    }
  }, [status, session]);

  return { status, isAdmin };
}
