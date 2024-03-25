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
      <header>
        <script
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        ></script>
      </header>
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
