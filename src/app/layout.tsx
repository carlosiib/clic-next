import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header/page";


export const metadata: Metadata = {
  title: "CLic Readers Wholesale",
  description: "CLic Readers Wholesale",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen grid grid-rows-[auto_1fr_auto]">
        <Header />
        {children}
      </body>
    </html>
  );
}
