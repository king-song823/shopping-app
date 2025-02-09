import "@/assets/styles/globals.css";
import type { Metadata } from "next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="{`{}`}">{children}</body>
    </html>
  );
}
