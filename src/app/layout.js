import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import LayoutClient from "@/app/LayoutClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Diarium",
  description: "Capture and share your daily achievements with Diarium.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 text-zinc-900`}
      >
        <AuthProvider>
          <LayoutClient>{children}</LayoutClient>
        </AuthProvider>
      </body>
    </html>
  );
}
