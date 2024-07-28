import styles from "@/utils/saas/itemCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface ItemCardProps {
  name: string;
  price: number;
  imageUrl: string;
  brand: string;
  stock: number;
  updateBtn(): void;
  deleteBtn(): void;
  onclickBtn(): void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  name,
  price,
  imageUrl,
  brand,
  stock,
  updateBtn,
  deleteBtn,
  onclickBtn,
}) => {
  const handleUpdateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Stop event propagation
    updateBtn(); // Call the updateBtn function
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Stop event propagation
    deleteBtn(); // Call the deleteBtn function
  };

  return (
    <div className={styles.card} onClick={onclickBtn}>
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
          <button className={styles.seeMore} onClick={handleUpdateClick}>
            See More
          </button>
          <button className={styles.delete} onClick={handleDeleteClick}>
            <FontAwesomeIcon icon={faTrash} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
