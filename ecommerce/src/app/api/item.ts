import axios, { AxiosError } from "axios";
import { Productts } from "@/utils/model/item";
import { UserModel } from "@/utils/model/user";
import { Route } from "next";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
// import { cookies } from "next/headers";

// const cookiesStore = cookies();

console.log(getCookie("jwt"));
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getCookie("jwt")}`,
  },
  // withCredentials: true,
});

export const getAllItems = async () => {
  try {
    const response = await api.get("/items/");
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    throw new Error(error.response?.statusText || error.message);
  }
};

export const addItem = async (item: Productts) => {
  try {
    const response = await api.post("/items/", item);
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    throw new Error(
      error.response?.statusText || error.message || `here is main error`
    );
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
    const response = await api.get(`/items/${itemId}`);
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    throw new Error(error.response?.statusText || error.message);
  }
};

export const updateItem = async (id: number, updatedData: Productts) => {
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
