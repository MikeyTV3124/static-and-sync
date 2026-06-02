import type { Metadata } from "next";
import { Michroma, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const michroma = Michroma({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-michroma",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Static & Sync | A Cyberpunk Audio Drama",
  description: "Static is the noise of the city; Sync is the connection keeping him alive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${michroma.variable} ${jetbrains.variable} h-full antialiased`}>
      <body className="bg-[#0A192F] text-[#CCD6F6] min-h-full font-mono">
        {children}
      </body>
    </html>
  );
}
