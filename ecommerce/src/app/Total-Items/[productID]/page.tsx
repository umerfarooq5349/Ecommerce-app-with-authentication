"use client";

import { getItem } from "@/app/api/item";
import BikeAnimiation from "@/components/bikeAnimiation/bikeAnimiation";
import { alert } from "@/utils/alerts/alert";
import { Products } from "@/utils/model/item";
import styles from "@/utils/saas/productDetails.module.scss";
import {
  faArrowLeftLong,
  faCheckSquare,
  faMinus,
  faPlus,
  faCartArrowDown,
  faCashRegister,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ProductDetailsPage = ({ params }: { params: { productID: number } }) => {
  const [product, setProduct] = useState<Products>();
  const [cartQuantity, setCartQuantity] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      if (params.productID) {
        try {
          const itemData = await getItem(params.productID);
          setProduct(itemData.data);
        } catch (error) {
          console.error("Error fetching item:", error);
        }
      }
    };
    fetchData();
  }, [params.productID]);
  const handleAddToCartBtn = async (item: Products) => {
    try {
      const cartProduct = { ...item, quantity: cartQuantity };
      const response = await axios.post("/api/cart", {
        item,
      });
      alert(response.data.message, 1500);
      console.log(`Added item ${cartProduct} to cart`);
      console.log(response);
    } catch (error) {
      console.error("Failed to add item to cart", error);
    }
  };

  const handleCartIncrement = () => {
    setCartQuantity((prev) => ++prev);
  };
  const handleCartDecrement = () => {
    setCartQuantity((prev) => --prev);
  };
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <Link href="/total-items" className={styles.backLink}>
          <FontAwesomeIcon icon={faArrowLeftLong} size="xl" /> Back to list
        </Link>
        {product ? (
          <>
            <div className={styles.left}>
              <div className={styles.img}>
                <Image src={product?.thumbnail!} alt={product?.title!} fill />
              </div>
            </div>

            <div className={styles.right}>
              <div className={styles.discount}>
                Get {product?.discountPercentage}% Off
              </div>

              <div className={styles.title}>
                <h5>{product?.title}</h5>
                <p>{product?.description}</p>
              </div>

              <div className={styles.itemPrice}>
                <p className={styles.discountedPrice}>
                  $
                  {(
                    product?.price! *
                    (1 - product?.discountPercentage! / 100)
                  ).toFixed(2)}
                </p>
                <p className={styles.orignalPrice}>
                  ${product?.price.toFixed(2)}
                </p>
              </div>

              <div className={styles.product}>
                <div className={styles.id}>
                  <h5>Product code:</h5>
                  <p>{product?._id}</p>
                </div>

                <div className={styles.stock}>
                  <FontAwesomeIcon icon={faCheckSquare} /> In Stock
                </div>
              </div>

              <div className={styles.quantityBtn}>
                <FontAwesomeIcon
                  icon={faMinus}
                  className={styles.minusBtn}
                  onClick={handleCartDecrement}
                />
                {cartQuantity}
                <FontAwesomeIcon
                  icon={faPlus}
                  className={styles.plusBtn}
                  onClick={handleCartIncrement}
                />
              </div>

              <div className={styles.actionBtn}>
                <div className={`${styles.buyNow} ${styles.button}`}>
                  <FontAwesomeIcon icon={faCashRegister} /> Buy Now
                </div>
                <div
                  className={`${styles.addToCart} ${styles.button}`}
                  onClick={() => {
                    handleAddToCartBtn(product);
                  }}
                >
                  <FontAwesomeIcon icon={faCartArrowDown} /> Add To Cart
                </div>
              </div>
            </div>
          </>
        ) : (
          <BikeAnimiation text="Fetching product data" />
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
