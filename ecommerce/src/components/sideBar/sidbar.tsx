// Sidebar.tsx

// Import React and necessary dependencies
import React, { useState, useEffect } from "react";
import styles from "@/utils/saas/sidebar.module.scss"; // Import the Sidebar styles

import { getItem } from "@/app/api/item"; // Import the getItem function
import { ProductType } from "@/utils/types/product.types";

// Define the SidebarProps interface
interface SidebarProps {
  id: number | string; // Accepts an ID
}

// Define the Sidebar component
const Sidebar: React.FC<SidebarProps> = ({ id }) => {
  // Define state to store the product data
  const [product, setProduct] = useState<ProductType>({
    thumbnail: "",
    title: "",
    price: 0,
    brand: "",
    stock: 0,
    _id: undefined,
    description: "",
    discountPercentage: 0,
    category: "",
  });

  // Fetch product data based on the ID when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemData = await getItem(id);
        setProduct(itemData.data); // Set the product data
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchData(); // Call the fetchData function
  }, [id]); // Depend on the ID

  // Return the JSX for the Sidebar component
  return (
    <div className={styles.container}>
      <div className={styles.product}>
        <h1 className={styles.title}>{product.title}</h1>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.thumbnail}
        />
        <div className={styles.details}>
          {/* Render product details */}
          <div className={styles.group}>
            <div className={styles.subGroup}>
              <div className={styles.head}>
                <p>Brand</p>
              </div>
              <div className={styles.body}>
                <p>{product.brand}</p>
              </div>
            </div>
            <div className={styles.subGroup}>
              <div className={styles.head}>
                <p>Price:</p>
              </div>
              <div className={styles.body}>
                <p>${product.price}</p>
              </div>
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.subGroup}>
              <div className={styles.head}>
                <p>Category</p>
              </div>
              <div className={styles.body}>
                <p>{product.category}</p>
              </div>
            </div>
            <div className={styles.subGroup}>
              <div className={styles.head}>
                <p>Discount</p>
              </div>
              <div className={styles.body}>
                <p>{product.discountPercentage}%</p>
              </div>
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.subGroup}>
              <div className={styles.head}>
                <p>Stock</p>
              </div>
              <div className={styles.body}>
                <p>{product.stock}</p>
              </div>
            </div>
          </div>
          <div className={`${styles.subGroup} ${styles.description}`}>
            <div className={styles.head}>
              <p>Description</p>
            </div>
            <div className={styles.body}>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; // Export the Sidebar component
