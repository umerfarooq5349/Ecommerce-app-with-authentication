import axios, { AxiosError } from "axios";

import { getCookie } from "cookies-next";
import { getToken } from "next-auth/jwt";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getCookie("jwt")}`,
  },
});
