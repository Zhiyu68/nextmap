import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./RootCompoents/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ride Request App",
  description: "An app for mastering Next.js, Supabase and the Google Maps API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
