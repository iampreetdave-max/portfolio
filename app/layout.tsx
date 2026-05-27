import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Preet Dave | AI-ML Engineer",
  description:
    "Building intelligent systems with deep learning, computer vision, and advanced ML algorithms. AI-ML Engineer & B.Tech CS student.",
  keywords: ["AI Engineer", "Machine Learning", "Deep Learning", "Computer Vision", "NLP", "Portfolio"],
  authors: [{ name: "Preet Ghanshyam Dave" }],
  openGraph: {
    title: "Preet Dave | AI-ML Engineer",
    description:
      "Building intelligent systems with deep learning, computer vision, and advanced ML algorithms.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Preet Dave | AI-ML Engineer",
    description:
      "Building intelligent systems with deep learning, computer vision, and advanced ML algorithms.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
