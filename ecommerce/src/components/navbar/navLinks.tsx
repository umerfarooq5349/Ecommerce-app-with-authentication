"use client";

import OneLink from "./oneLink";
import styles from "@/utils/saas/navLinks.module.scss";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const NavLinks = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [role, setRole] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session) {
      setIsLoggedIn(true);
      const userRole = session.user?.role || "";
      setIsAdmin(userRole === "admin");
      setRole(userRole);
      setUserName(session.user?.name || null);
    } else {
      setIsLoggedIn(false);
    }
  }, [session, status]);

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are going to logout",
      icon: "warning",
      // background: "#ccc url(/images/trees.png)",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await signOut({ callbackUrl: "/login" });
      }
    });
  };

  const pages = [{ title: "Home", route: "/" }];

  const renderLinks = () => (
    <>
      {pages.map((link) => (
        <OneLink key={link.route} oneLink={link} />
      ))}
      {isLoggedIn ? (
        <>
          {isAdmin && (
            <OneLink
              key="addproduct"
              oneLink={{ title: "Add Product", route: "/addproduct" }}
            />
          )}
          <OneLink key="profile" oneLink={{ title: userName!, route: "/" }} />
          <div onClick={handleLogout} role="button" tabIndex={0}>
            <OneLink key="logout" oneLink={{ title: "Logout", route: "" }} />
          </div>
        </>
      ) : (
        <OneLink key="login" oneLink={{ title: "Login", route: "/login" }} />
      )}
    </>
  );

  return (
    <div className={styles.nav}>
      <div className={styles.navbarContainer}>{renderLinks()}</div>

      {/* Toggle button for small screens */}
      <button
        className={styles.menuButton}
        onClick={() => setOpen((prev) => !prev)}
        aria-pressed={open}
      >
        {open ? (
          <FontAwesomeIcon icon={faBars} />
        ) : (
          <FontAwesomeIcon icon={faBoxOpen} />
        )}
      </button>

      {/* Mobile navbar */}
      {open && <div className={styles.smallScreen}>{renderLinks()}</div>}
    </div>
  );
};

export default NavLinks;
