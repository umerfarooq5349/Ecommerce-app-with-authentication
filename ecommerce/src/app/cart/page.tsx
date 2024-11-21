"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import styles from "@/utils/saas/cart.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

type CartItem = {
  _id: string;
  userId: string;
  itemId: {
    _id: string;
    title: string;
    thumbnail: string;
  };
  addedAt: string;
  discount: number;
  isAvailable: boolean;
  price: number;
  quantity: number;
};

const Cart = () => {
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);

  // Fetch cart products
  const fetchCartProducts = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/cart/`);
      setCartProducts(data.data);
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
                    <img src={item.itemId.thumbnail} alt={item.itemId.title} />
                    <span>{item.itemId.title}</span>
                  </div>
                </td>
                <td>{new Date(item.addedAt).toLocaleString()}</td>
                <td>{item.discount}%</td>
                <td>{item.isAvailable ? "Available" : "Out of Stock"}</td>
                <td>${item.price}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faMinus}
                    size="xl"
                    onClick={() => handleQuantityChange(item, false)}
                  />
                  {item.quantity}
                  <FontAwesomeIcon
                    icon={faPlus}
                    size="xl"
                    onClick={() => handleQuantityChange(item, true)}
                  />
                  <FontAwesomeIcon
                    icon={faXmark}
                    size="xl"
                    onClick={() => handleQuantityChange(item, false, true)}
                  />
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
