import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import styles from "@/utils/saas/home.module.scss";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
import ClientSessionProvider from "@/components/clientSideProvider/ClientSessionProvider"; // Import the new provider component
import AuthProvider from "@/utils/context/AuthProvider";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "Created by Umer Farooq",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className={styles.main}>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
