import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CrossFit Bakesi — 2026 Team Series Dashboard",
  description: "Track the CrossFit Bakesi 2026 Team Series leaderboard and positive highlights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
