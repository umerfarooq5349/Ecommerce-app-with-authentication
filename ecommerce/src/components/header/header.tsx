"use client";

import { useEffect } from "react";
import styles from "@/utils/saas/header.module.scss";
import { useHeader } from "@/context/headerContext";

const Header = () => {
  const { title, setTitle } = useHeader();

  return <div className={styles.header}>{title}</div>;
};

export default Header;
