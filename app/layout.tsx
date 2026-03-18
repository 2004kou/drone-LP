import type { Metadata } from "next";
import { Shippori_Mincho_B1, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const shippori = Shippori_Mincho_B1({
  weight: ["400", "800"],
  subsets: ["latin"],
  variable: "--font-shippori",
});



export const metadata: Metadata = {
  title: "Freiheit（フライハイト）| ドローンスクール",
  description: "Freiheit（フライハイト）は、初心者から上級者まで対応したドローンスクールです。丁寧な指導で安全・確実に操縦技術を習得できます。",
  icons: {
    icon: "/favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={cn("font-sans", geist.variable)}>
      <body
        className={`${shippori.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

