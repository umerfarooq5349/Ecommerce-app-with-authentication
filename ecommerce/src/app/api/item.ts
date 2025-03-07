import axios, { AxiosError } from "axios";
import { ProductType } from "@/utils/types/product.types";
import { api } from "@/utils/api response/apiRequest";

export const getAllItems = async () => {
  try {
    const response = await api.get("/items/");
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    throw new Error(error.response?.statusText || error.message);
  }
};

export const addItem = async (item: ProductType) => {
  try {
    const response = await api.post("/items/", item);

    return response.data;
  } catch (e) {
    console.log(e);
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data!.message);
    }
    throw new Error("Product info is not valid or some error occured");
  }
};

export const deleteItem = async (item: any) => {
  const itemId = item;
  try {
    const response = await api.delete(`/items/${itemId}`);
    return response;
  } catch (e) {
    const error = e as AxiosError;
    throw new Error(error.response?.statusText || error.message);
  }
};

export const getItem = async (item: any) => {
  const itemId = item;
  try {
    console.log("called", itemId);

    const response = await api.get(`/items/${itemId}`);
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    throw new Error(error.response?.statusText || error.message);
  }
};

export const updateItem = async (id: number, updatedData: ProductType) => {
  try {
    const response = await api.put(`/items/${id}`, updatedData);
    console.log(`Success: ${response}`);
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    throw new Error(error.response?.statusText || error.message);
  }
};

export const uploadProductImage = async (imageFile: File) => {
  const formData = new FormData();
  formData.set("thumbnail", imageFile);

  try {
    const response = await axios.post(
      "http://localhost:8080/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    throw new Error(error.response?.statusText || error.message);
  }
};
