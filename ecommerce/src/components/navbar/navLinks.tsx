"use client";

import OneLink from "./oneLink";
import styles from "@/utils/saas/navLinks.module.scss";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { NavLinkType } from "@/utils/types/navbar.types";

const NavLinks = () => {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const [userName, setUserName] = useState<string | null>(null);
  const [role, setRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session) {
      setRole(session.user?.role || "");
      setUserName(session.user?.name.toLocaleUpperCase() || null);
    }
  }, [session, status]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are going to logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!",
    });
    if (result.isConfirmed) {
      await signOut({ callbackUrl: "/login" });
    }
  };

  const renderLinks = () => (
    <>
      {status === "authenticated" ? (
        <>
          <OneLink key="home" oneLink={{ title: "Home", route: "/" }} />
          {role === "admin" ? (
            <OneLink
              key="addproduct"
              oneLink={{ title: "Add Product", route: "/addproduct" }}
            />
          ) : (
            <OneLink key="cart" oneLink={{ title: "Cart", route: "/cart" }} />
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
      <button
        className={styles.menuButton}
        onClick={() => setOpen(!open)}
        aria-pressed={open}
      >
        <FontAwesomeIcon icon={open ? faBars : faBoxOpen} />
      </button>
      {open && <div className={styles.smallScreen}>{renderLinks()}</div>}
    </div>
  );
};

export default NavLinks;
