"use client";
import styles from "@/utils/saas/oneLink.module.scss";
import { NavLinkType } from "@/utils/types/navbar.types";
import Link from "next/link";
import { usePathname } from "next/navigation";

// interface OneLinkProps {
//   title: string;
//   route: string;
// }

const OneLink = ({ oneLink }: { oneLink: NavLinkType }) => {
  const path = usePathname();
  return (
    <Link
      href={oneLink.route}
      className={`${styles.navLink} ${
        path === oneLink.route ? styles.activPath : ""
      }`}
    >
      {oneLink.title}
    </Link>
  );
};

export default OneLink;
