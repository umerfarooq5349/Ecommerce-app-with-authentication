"use client";
import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import styles from "@/utils/saas/cart.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { CartItem } from "@/utils/types/cartItem.types";
import Image from "next/image";
import { alert } from "@/utils/alerts/alert";
import BikeAnimiation from "@/components/bikeAnimiation/bikeAnimiation";
import { useHeader } from "@/context/headerContext";
import Header from "@/components/header/header";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  // const { title, setTitle } = useHeader();
  // Fetch cart products
  const fetchCartProducts = useCallback(async () => {
    setLoading(true); // Start loading
    try {
      // setTitle("Your Cart");
      const { data } = await axios.get(`/api/cart/`);
      setCartProducts(data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);

        alert(error.response?.data.message, 2000);
      }
      alert("Failed to fetch cart products", 2000);
    } finally {
      // console.log(title);
      setLoading(false); // Stop loading
    }
  }, []);

  // Handle quantity increment or decrement with optimistic UI
  const handleQuantityChange = async (
    item: CartItem,
    increment: boolean = true,
    remove: boolean = false
  ) => {
    // Optimistically update UI
    const updatedCart: CartItem[] = cartProducts
      .map((cartItem) => {
        if (cartItem._id === item._id) {
          if (remove) {
            return null; // Mark for removal
          } else {
            return {
              ...cartItem,
              quantity: increment
                ? cartItem.quantity + 1
                : cartItem.quantity - 1,
            };
          }
        }
        return cartItem;
      })
      .filter((cartItem): cartItem is CartItem => cartItem !== null); // Filter out null values

    setCartProducts(updatedCart); // Update UI immediately

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
      // Rollback UI update in case of error
      fetchCartProducts();
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, [fetchCartProducts]);

  return (
    <div>
      {/* <Header /> */}
      {loading ? (
        <BikeAnimiation text="Loading Cart products" />
      ) : cartProducts.length === 0 ? (
        <div className={styles.message}>No items available in cart</div>
      ) : (
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
      )}
    </div>
  );
};

export default Cart;
