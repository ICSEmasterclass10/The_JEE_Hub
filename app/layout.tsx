import type { Metadata, Viewport } from "next";
import "./globals.css";
import RootLayoutContent from "./layout-content";

export const metadata: Metadata = {
  title: "The JEE Hub - Complete JEE Preparation Platform",
  description:
    "Your all-in-one platform for JEE Main & Advanced preparation with AI-powered tools, daily tasks, notes, and comprehensive syllabus tracking.",
  keywords: [
    "JEE",
    "JEE Main",
    "JEE Advanced",
    "IIT",
    "Preparation",
    "Study Platform",
  ],
  authors: [{ name: "ICSE Masterclass" }],
  openGraph: {
    title: "The JEE Hub",
    description: "Complete JEE preparation platform with AI tools",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#3B82F6",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="bg-background text-foreground">
        <RootLayoutContent>{children}</RootLayoutContent>
      </body>
    </html>
  );
}
