import React from "react";
import styles from "@/utils/saas/hero.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

const featuredProducts = [
  { title: "Dumy Image", url: "/assets/login.jpg" },
  { title: "Dumy Image", url: "/assets/login.jpg" },
  { title: "Dumy Image", url: "/assets/login.jpg" },
];

function Hero() {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.left}>
          <div className={styles.cta}>
            <div className={styles.ctaTag}>Let Them Say WOW</div>
            <h1>Modern & Minimalist Furniture </h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam
              labore modi rerum explicabo sint aliquam quo, minima, quos maiores
              laudantium aspernatur dolore eos temporibus iste enim natus
              impedit eum atque.
            </p>
            <div className={styles.ctaBtn}>
              <Link href={"#allProducts"} className={styles.btn}>
                {" "}
                Shop Now <FontAwesomeIcon icon={faArrowRightLong} size="xl" />
              </Link>
            </div>
          </div>
          <div className={styles.heroRow}>
            <div className={styles.rowItem}>
              <h3>25+</h3>
              <p>Unique Products</p>
            </div>
            <div className={styles.rowItem}>
              <h3>200+</h3>
              <p>Happy Customers</p>
            </div>
            <div className={styles.rowItem}>
              <h3>10</h3>
              <p>Outlets</p>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.featured}>
            {featuredProducts.map((product, index) => (
              <div className={styles.imageCard} key={index}>
                <p>{product.title}</p>
                <Image
                  className={styles.img}
                  src={product.url}
                  fill
                  alt={product.title}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
