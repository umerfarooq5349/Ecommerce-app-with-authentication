import styles from "@/utils/saas/itemCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

interface ItemCardProps {
  name: string;
  price: number;
  imageUrl: string;
  brand: string;
  stock: number;
  discount: number;
  showDetailsBtn?(): void;
  deleteBtn(): void;
  // update or add to cart
  actionBtn(
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.MouseEvent<HTMLButtonElement>
  ): void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  name,
  price,
  imageUrl,
  brand,
  stock,
  discount,
  showDetailsBtn,
  deleteBtn,
  actionBtn,
}) => {
  // const handleshowDetailsBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.stopPropagation(); // Stop event propagation
  //   showDetailsBtn(); // Call the showDetailsBtn function
  // };

  // const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.stopPropagation(); // Stop event propagation
  //   deleteBtn(); // Call the deleteBtn function
  // };

  // const handleCardOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
  //   e.stopPropagation(); // Stop event propagation
  //   if (session && session.user.role === "admin") {
  //     onclickBtn(); // Call the deleteBtn function
  //   }
  //   console.log(`you are not  admin`);
  // };

  // const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.stopPropagation(); // Stop event propagation

  //   console.log("Added to cart");
  // };
  const { data: session } = useSession();
  return (
    <div className={styles.card} onClick={showDetailsBtn}>
      <div className={styles.cardHeader}>
        <div className={styles.headerBtn}>
          <div className={styles.button}>{discount}% Off</div>

          {session && session.user.role === "admin" ? (
            <>
              <div className={styles.headerRightBtn}>
                <div
                  className={`${styles.update} ${styles.button}`}
                  onClick={actionBtn}
                >
                  <FontAwesomeIcon icon={faEdit} /> Update
                </div>
                <div
                  className={`${styles.delete} ${styles.button}`}
                  onClick={deleteBtn}
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </div>
              </div>
            </>
          ) : (
            <div
              className={`${styles.addToCart} ${styles.button}`}
              onClick={actionBtn}
            >
              <FontAwesomeIcon icon={faCartArrowDown} /> Cart
            </div>
          )}

          {/* <div className={styles.button} onClick={addTocartBtn}>
            <FontAwesomeIcon icon={faCartArrowDown} />
            Add to Cart
          </div> */}
        </div>
        <Image src={imageUrl} alt={name} className={styles.itemImage} fill />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.itemInfo}>
          <h3 className={styles.itemName}>{name}</h3>
          <h3 className={styles.itemBrand}>{brand}</h3>
        </div>
        <div className={styles.itemPrice}>
          <p className={styles.orignalPrice}>${price.toFixed(2)}</p>
          <p className={styles.discountedPrice}>
            {" "}
            ${(price * (1 - discount / 100)).toFixed(2)}
          </p>
        </div>

        <div className={stock <= 0 ? styles.outOfStock : styles.inStock}>
          {stock > 0 ? `In Stock: ${stock}` : "Out of Stock"}
        </div>
      </div>

      {/* <div className={styles.cardFooter}>
        <p className={styles.itemPrice}>${price.toFixed(2)}</p>
        <div className={stock <= 0 ? styles.outOfStock : styles.inStock}>
          {stock > 0 ? `In Stock: ${stock}` : "Out of Stock"}
        </div>
        <button className={styles.seeMore} onClick={showDetailsBtn}>
          See More
        </button>
        {session && session.user.role === "admin" ? (
          <button className={styles.delete} onClick={deleteBtn}>
            <FontAwesomeIcon icon={faTrash} /> Delete
          </button>
        ) : (
          <button className={styles.seeMore} onClick={addTocartBtn}>
            <FontAwesomeIcon icon={faCartArrowDown} />
          </button>
        )}
      </div> */}
    </div>
  );
};

export default ItemCard;
