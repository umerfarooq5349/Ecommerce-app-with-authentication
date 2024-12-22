"use client";

import { usePathname } from "next/navigation";
import NavLinks from "./navLinks";
import { useHeader } from "@/context/headerContext";
import Header from "../header/header";

const Navbar: React.FC = () => {
  const path = usePathname();
  const { setTitle } = useHeader();

  const setHeaderTitle = (path: string) => {
    if (path === "/cart") {
      setTitle("Cart Details");
    } else if (path === "/addproduct") {
      setTitle("Add Product");
    } else if (path.includes("/total-items/update")) {
      setTitle("Update Product");
    } else if (path.includes("/total-items/")) {
      setTitle("Product Details");
    } else if (path.includes("/total-items")) {
      setTitle("All Products");
    } else if (path.startsWith("/checkOut/")) {
      setTitle("Proceed to Payments");
    }
  };

  // Set title based on current path
  if (path) {
    setHeaderTitle(path);
  }

  const isAuthPage = path === "/login" || path === "/signup";

  return isAuthPage ? null : (
    <div>
      <NavLinks />
      {path !== "/" && <Header />}
    </div>
  );
};

export default Navbar;
