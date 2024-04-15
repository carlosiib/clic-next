import type { Metadata } from "next";
import "./globals.css";


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
      <body >{children}</body>
    </html>
  );
}
