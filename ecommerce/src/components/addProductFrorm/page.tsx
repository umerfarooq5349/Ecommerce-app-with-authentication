"use client";
import { useState } from "react";

import { addItem, uploadProductImage } from "@/app/api/item";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Foorm from "../form/form";

import { AxiosError } from "axios";
import { ProductType } from "@/utils/types/product.types";

const AddProduct = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<ProductType>({
    price: 0,
    description: "",
    title: "",
    discountPercentage: 0,
    stock: 10,
    brand: "",
    category: "",
    thumbnail: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) {
      try {
        const response = await uploadProductImage(image);
        setFormData((prevState: any) => ({
          ...prevState,
          thumbnail: response.url,
        }));
      } catch (error) {
        if (error instanceof AxiosError) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response?.data.message,
          });
        }
        console.log(error);

        throw new Error("Error uploading image");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      addItem(formData)
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Item has been added successfully",
            showConfirmButton: false,
            timer: 3000,
          });
          router.push("/");
        })
        .catch((e) => {
          console.log("submit ", e);

          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Product image is required",
            // text: e,
          });
        });
    } catch (error: any) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
      console.log(error);
      throw new Error("Error in Adding new item");
    }
  };

  return (
    <Foorm
      brand={formData.brand}
      category={formData.category}
      description={formData.description}
      discountPercentage={formData.discountPercentage}
      price={formData.price}
      stock={formData.stock}
      thumbnail={formData.thumbnail}
      title={formData.title}
      handleImageUpload={handleImageUpload}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      heading="Add"
    ></Foorm>
  );
};

export default AddProduct;
