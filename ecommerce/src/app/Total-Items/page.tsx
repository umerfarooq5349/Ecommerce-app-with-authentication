"use client";
import React, { useEffect, useState } from "react";
import { deleteItem, getAllItems } from "../api/item";
import ItemCard from "@/components/card/itemCard";
import styles from "@/utils/saas/total-items.module.scss";
import Sidebar from "@/components/sideBar/sidbar"; // Import the Sidebar component
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Products } from "@/utils/model/item";
import BikeAnimiation from "@/components/bikeAnimiation/bikeAnimiation";
import { useSession } from "next-auth/react";
import axios from "axios";
// import { homeProducts } from "@/utils/types/dumydata";

const TotalProducts = () => {
  const router = useRouter();
  const [allItems, setAllItems] = useState<Products[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<
    number | string | undefined
  >(undefined);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsData = await getAllItems();
        setAllItems(itemsData.data);
        // setAllItems(homeProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchItems();
  }, []);

  const handleShowDetails = async (itemId: number | string) => {
    console.log(`See more ${itemId}`);
    // setSelectedItemId(itemId);
    router.push(`/total-items/${itemId}`);
  };

  const handleDelete = async (itemId: number | string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are going to delete this item",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteItem(itemId);
        Swal.fire({
          title: "Deleted!",
          text: "Item has been deleted.",
          icon: "success",
        });
        setAllItems(allItems.filter((item) => item._id !== itemId));
        if (selectedItemId === itemId) {
          setSelectedItemId(undefined);
        }
      }
    });
  };

  const addToCartBtn = async (item: Products) => {
    try {
      const response = await axios.post("/api/cart", {
        item,
      });
      console.log(session?.user.email);
      console.log(`Added item ${item} to cart`);
    } catch (error) {
      console.error("Failed to add item to cart", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        {/* {selectedItemId && (
          <div className={styles.sidebar} id="sidebar">
            <Sidebar id={selectedItemId || 0} />
          </div>
        )} */}
        {allItems.length === 0 ? (
          <BikeAnimiation text="No items Available" />
        ) : (
          allItems.map((item: Products) => (
            <ItemCard
              imageUrl={item.thumbnail}
              name={item.title}
              price={item.price}
              brand={item.brand}
              key={item._id}
              stock={item.stock}
              discount={item.discountPercentage}
              showDetailsBtn={() => handleShowDetails(item._id || 0)}
              deleteBtn={() => handleDelete(item._id || 0)}
              actionBtn={() => {
                session?.user.role === "admin"
                  ? router.push(`/total-items/update/${item._id}`)
                  : addToCartBtn(item);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TotalProducts;
