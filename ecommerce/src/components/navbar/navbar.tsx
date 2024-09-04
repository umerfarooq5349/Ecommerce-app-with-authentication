"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

import styles from "@/utils/saas/navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div></div>;
  }
  console.log(session?.user.name);
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className={styles.container}>
      <div className={styles.brand}>
        <Link href="/">My Store</Link>
      </div>
      <div className={styles.body}>
        <ul>
          {session ? (
            <>
              {session && session.user.role === "admin" ? (
                <li>
                  <Link href="/AddProduct">admin</Link>
                </li>
              ) : (
                <li>
                  <Link href="/AddProduct">{session.user.name}</Link>
                </li>
              )}
              <li>
                <Link href="/AddProduct">Add Product</Link>
              </li>
              <li>
                <Link href="/" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOut} />
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/signup">SignUp</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
