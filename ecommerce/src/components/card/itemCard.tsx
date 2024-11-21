import styles from "@/utils/saas/itemCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";

interface ItemCardProps {
  name: string;
  price: number;
  imageUrl: string;
  brand: string;
  stock: number;
  showDetailsBtn(): void;
  deleteBtn(): void;
  addTocartBtn(): void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  name,
  price,
  imageUrl,
  brand,
  stock,
  showDetailsBtn,
  deleteBtn,
  addTocartBtn,
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
    <div
      className={styles.card}
      // onClick={showDetailsBtn}
    >
      <div className={styles.content}>
        <img src={imageUrl} alt={name} className={styles.itemImage} />
        <div className={styles.itemInfo}>
          <h3 className={styles.itemName}>{name}</h3>
          <h3 className={styles.itemBrand}>{brand}</h3>
        </div>
        <p className={styles.itemPrice}>${price.toFixed(2)}</p>
        <div className={stock <= 0 ? styles.outOfStock : styles.inStock}>
          {stock > 0 ? `In Stock: ${stock}` : "Out of Stock"}
        </div>
        <div className={styles.buttons}>
          <button className={styles.seeMore} onClick={showDetailsBtn}>
            See More
          </button>
          {session && session.user.role === "admin" ? (
            <button className={styles.delete} onClick={deleteBtn}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
          ) : (
            <button className={styles.seeMore} onClick={addTocartBtn}>
              <FontAwesomeIcon icon={faCartArrowDown} /> Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
