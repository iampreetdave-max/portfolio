import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Preet Ghanshyam Dave | AI-ML Engineer",
  description:
    "Building intelligent systems with deep learning, computer vision, and advanced ML algorithms",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
