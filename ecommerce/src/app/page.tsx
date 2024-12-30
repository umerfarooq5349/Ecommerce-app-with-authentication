import Hero from "@/components/hero/hero";
import TotalProducts from "./total-items/page";
import styles from "@/utils/saas/home.module.scss";

export default function Home() {
  return (
    // <AuthContext>

    <div className={styles.container}>
      <Hero />
      <div className={styles.content} id="allProducts">
        <TotalProducts />
      </div>
    </div>
  );
}
