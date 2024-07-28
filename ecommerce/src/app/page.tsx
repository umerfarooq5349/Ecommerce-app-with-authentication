import Image from "next/image";
import styles from "@/utils/saas/home.module.scss";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import TotalProducts from "./Total-Items/page";
// import AuthContext from "./context/AuthContext";

export default function Home() {
  return (
    // <AuthContext>
    <main className={styles.main}>
      <TotalProducts />
    </main>
    // </AuthContext>
  );
}
