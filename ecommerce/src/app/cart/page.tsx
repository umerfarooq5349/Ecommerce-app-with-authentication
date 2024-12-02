"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import styles from "@/utils/saas/cart.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { CartItem } from "@/utils/types/cartItem.types";
import Image from "next/image";
import { cartProduct } from "@/utils/types/dumydata";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);

  // Fetch cart products
  const fetchCartProducts = useCallback(async () => {
    try {
      // const { data } = await axios.get(`/api/cart/`);
      // setCartProducts(data.data);
      setCartProducts(cartProduct);
    } catch (error) {
      console.error("Failed to fetch cart products:", error);
    }
  }, []);

  // Handle quantity increment or decrement
  const handleQuantityChange = async (
    item: CartItem,
    increment: boolean = true,
    remove: boolean = false
  ) => {
    try {
      if (remove) {
        await axios.delete(`/api/cart/${item.itemId._id}?delete=true`);
      } else if (increment) {
        await axios.post(`/api/cart/`, {
          _id: item.itemId._id,
          price: item.price,
          discountPercentage: item.discount,
        });
      } else {
        await axios.delete(`/api/cart/${item.itemId._id}?delete=false`);
      }
      // Refetch cart products after update
      fetchCartProducts();
    } catch (error) {
      console.error("Failed to update cart item:", error);
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, [fetchCartProducts]);

  return (
    <div>
      <div className={styles.tableContainer}>
        <table className={styles.cartTable}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Added At</th>
              <th>Discount</th>
              <th>Availability</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className={styles.item}>
                    <Image
                      className={styles.itemImage}
                      src={item.itemId.thumbnail}
                      alt={item.itemId.title}
                      width={100}
                      height={100}
                      // fill
                    />
                    <p className={styles.itemTitle}>{item.itemId.title}</p>
                  </div>
                </td>
                <td>{new Date(item.addedAt).toLocaleString()}</td>
                <td>{item.discount}%</td>
                <td>{item.isAvailable ? "Available" : "Out of Stock"}</td>
                <td>${item.price}</td>
                <td>
                  <div className={styles.quantityBtn}>
                    <FontAwesomeIcon
                      icon={faMinus}
                      size="xl"
                      className={styles.minusBtn}
                      onClick={() => handleQuantityChange(item, false)}
                    />
                    {item.quantity}
                    <FontAwesomeIcon
                      icon={faPlus}
                      size="xl"
                      className={styles.plusBtn}
                      onClick={() => handleQuantityChange(item, true)}
                    />
                    <FontAwesomeIcon
                      icon={faXmark}
                      size="xl"
                      className={styles.removeBtn}
                      onClick={() => handleQuantityChange(item, false, true)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
