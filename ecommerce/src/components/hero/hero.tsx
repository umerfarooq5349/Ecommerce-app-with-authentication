"use client";
import React, { useCallback, useEffect, useState } from "react";
import styles from "@/utils/saas/hero.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import axios, { Axios, AxiosError } from "axios";
import { featuredProductsTypes } from "@/utils/types/featured";
import { alert } from "@/utils/alerts/alert";

// const featuredProducts = [
//   {
//     title: "Dumy Image",
//     url: "https://images.pexels.com/photos/1845208/pexels-photo-1845208.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   },
//   { title: "Dumy Image", url: "/assets/login.jpg" },
//   {
//     title: "Dumy Image",
//     url: "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   },
// ];

function Hero() {
  const [featuredProducts, setFeaturedProducts] = useState<
    featuredProductsTypes[]
  >([]);

  const getFeaturedProducts = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER}/api/featured`
      );
      // console.log(response.data.data);

      setFeaturedProducts(response.data.data);
    } catch (e) {
      const error = e as AxiosError;

      alert("No featured product available yet!", 1500);
    }
  }, []);
  useEffect(() => {
    getFeaturedProducts();
  }, [getFeaturedProducts]);

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
              <div
                key={index}
                className={styles.featuredProduct}
                style={{
                  backgroundImage: `url(${product.thumbnail})`,
                }}
              >
                <div className={styles.featuredProductName}>
                  <h2>{product.title}</h2>
                  <span>Hot selling product</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
