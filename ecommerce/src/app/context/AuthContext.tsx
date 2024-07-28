"use client";
import { useState, createContext, useEffect } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
  passwordConfirm?: string;
}

interface State {
  loading: boolean;
  error: string | null;
  isFetchingUser: boolean;
  data: User | null;
}

export const AuthenticationContext = createContext<State>({
  loading: false,
  data: null,
  error: null,
  isFetchingUser: true,
});

export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authState, setAuthState] = useState<State>({
    loading: false,
    data: null,
    isFetchingUser: true,
    error: null,
  });

  const fetchUser = async (redirect: boolean) => {
    // Add parameter to indicate whether redirection is needed
    setAuthState((prev) => ({ ...prev, isFetchingUser: true }));

    try {
      const jwt = getCookie("jwt");
      console.log(`jwt: ${jwt}`);
      if (!jwt) {
        setAuthState((prev) => ({
          ...prev,
          isFetchingUser: false,
          data: null,
        }));
        if (redirect) {
          router.push("/Login"); // Redirect only if redirect parameter is true
        }
      } else {
        const response = await axios.get("/api/me", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        console.log(response);

        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

        setAuthState((prev) => ({
          ...prev,
          isFetchingUser: false,
          data: response?.data,
        }));
      }
    } catch (error: any) {
      console.log(error);
      setAuthState((prev) => ({ ...prev, isFetchingUser: false, data: null }));
    }
  };

  useEffect(() => {
    fetchUser(true); // Always redirect initially
  }, [router]);

  return (
    <AuthenticationContext.Provider value={{ ...authState }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
