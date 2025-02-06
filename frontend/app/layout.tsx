import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";



export const metadata: Metadata = {
  title: "TeeGenius",
  description: "t-shirt print be AI prompt company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <main className="relative overflow-hidden pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
