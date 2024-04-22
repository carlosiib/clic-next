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
      <body className="mb-2 min-h-screen">
        <Header />
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
}
