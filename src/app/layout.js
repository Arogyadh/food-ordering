import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";

import { AppProvider } from "@/components/AppContext";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "TC2",
  description: "The Culinary Corner, A Food Ordering Website for foodies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${roboto.className} h-full w-full`}>
        <main className="max-w-4xl h-full  mx-auto p-4">
          <AppProvider>
            <Toaster />
            <Header />
            {children}
            <footer className="border-t border-black p-8  text-center text-gray-500 mt-16">
              &copy; 2024 All Rights Reserved
            </footer>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
