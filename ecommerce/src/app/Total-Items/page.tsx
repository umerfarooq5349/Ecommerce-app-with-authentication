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
import axios, { AxiosError } from "axios";
import { alert } from "@/utils/alerts/alert";
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
        if (error instanceof AxiosError) {
          alert(error.response?.data.message, 2000);
        }

        alert((error as Error).message || "Error fetching data", 2000);
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

  const addToCartBtn = async (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.MouseEvent<HTMLButtonElement>,
    item: Products
  ) => {
    event.stopPropagation();
    try {
      const response = await axios.post("/api/cart", {
        item,
      });

      alert(response.data.message, 2000);
    } catch (error) {
      const err = error as AxiosError;

      if (error instanceof AxiosError) {
        alert(error.response?.data.message, 2000);
      }

      // alert(
      //   (error as AxiosError).response?.data?.message! ||
      //     "Unable to add to cart",
      //   2000
      // );
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
          allItems.map((item: Products, index) => (
            <ItemCard
              key={index}
              imageUrl={item.thumbnail}
              name={item.title}
              price={item.price}
              brand={item.brand}
              stock={item.stock}
              discount={item.discountPercentage}
              showDetailsBtn={() => handleShowDetails(item._id || 0)}
              deleteBtn={() => handleDelete(item._id || 0)}
              actionBtn={(event) => {
                session?.user.role === "admin"
                  ? router.push(`/total-items/update/${item._id}`)
                  : addToCartBtn(event, item);
              }}
            />
          ))
          // <BikeAnimiation text="Items Available" />
        )}
      </div>
    </div>
  );
};

export default TotalProducts;
