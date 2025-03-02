import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserProvider } from "@/constants/UserContext";

export const metadata: Metadata = {
  title: "TeeGenius",
  description: "AI-powered custom T-shirt printing platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-gray-900 flex flex-col min-h-screen">
        <UserProvider>
          <Navbar />
          <main className="relative pt-20 flex-1">{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
