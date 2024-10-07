"use client";
import React, { useEffect, useState } from "react";
import { deleteItem, getAllItems } from "../api/item";
import ItemCard from "@/components/card/itemCard";
import styles from "@/utils/saas/total-items.module.scss";
import Sidebar from "@/components/sideBar/sidbar"; // Import the Sidebar component
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Productts } from "@/utils/model/item";
import BikeAnimiation from "@/components/bikeAnimiation/bikeAnimiation";
import { useSession } from "next-auth/react";

const TotalProducts = () => {
  const router = useRouter();
  const [allItems, setAllItems] = useState<Productts[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | undefined>(
    undefined
  );
  const { data: session } = useSession();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsData = await getAllItems();
        setAllItems(itemsData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchItems();
  }, []);

  const handleShowDetails = async (itemId: number) => {
    console.log(`See more ${itemId}`);
    setSelectedItemId(itemId);
  };

  const handleDelete = async (itemId: number) => {
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectedItemId &&
        event.target instanceof Element &&
        !event.target.closest("#sidebar")
      ) {
        setSelectedItemId(undefined); // Close the sidebar if clicking outside
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selectedItemId]);

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        {selectedItemId && (
          <div className={styles.sidebar} id="sidebar">
            <Sidebar id={selectedItemId || 0} />
          </div>
        )}
        {allItems.length === 0 ? (
          <BikeAnimiation text="No items Available" />
        ) : (
          allItems.map((item: Productts) => (
            <ItemCard
              imageUrl={item.thumbnail}
              name={item.title}
              price={item.price}
              brand={item.brand}
              key={item._id}
              stock={item.stock}
              showDetailsBtn={() => handleShowDetails(item._id || 0)}
              deleteBtn={() => handleDelete(item._id || 0)}
              onclickBtn={() => {
                // If you need to navigate, ensure it doesn’t conflict with sidebar visibility
                router.push(`/total-items/${item._id}`);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TotalProducts;
