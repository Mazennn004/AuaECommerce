import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "../../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
import Navbar from "./_components/Navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import MySessionProvider from './SessionProvider/MySessionProvider';
import CartContextProvider from "./Context/CartContext";
import WishlistContextProvider from './Context/WishlistContext';
import Footer from './_components/Footer/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-poppins",
  subsets: ["latin"],
});
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Aura",
  description: "Shop with Aura",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <MySessionProvider >
          <CartContextProvider>
            <WishlistContextProvider>
             <Navbar />
        <main className="pt-[70px]">{children}</main>
        </WishlistContextProvider>
        <Toaster/>
          </CartContextProvider>
       
        </MySessionProvider>
        <Footer/>
      </body>
    </html>
  );
}
