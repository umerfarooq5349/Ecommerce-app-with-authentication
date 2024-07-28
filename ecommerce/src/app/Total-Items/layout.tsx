"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomLoader from "@/components/loader/customLoader";

interface UserResponse {
  user: string | null;
  error: Error | null;
}

export default function Total_ItemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [isLogedin, setLogedin] = useState<boolean>(false);
  useEffect(() => {
    const fetchUser = async () => {
      const { user, error } = await getUser();

      if (error) {
        // <CustomLoader></CustomLoader>;
        router.push("/");
      }
      setLogedin(true);
    };

    fetchUser();
  }, [router]);

  if (!isLogedin) {
    return <CustomLoader></CustomLoader>;
  }
  return (
    <main>
      <div>{children}</div>
    </main>
  );
}

async function getUser(): Promise<UserResponse> {
  try {
    const res = await fetch("/api/me/");
    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }
    const data = await res.json();
    return { user: data, error: null };
  } catch (e) {
    const error = e as Error;
    return { user: null, error };
  }
}
