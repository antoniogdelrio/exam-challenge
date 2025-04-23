import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Exam Challenge",
  description: "Desafie seus amigos com questionários personalizados",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="mx-4 mb-4 sm:mx-auto sm:w-full sm:max-w-[500px]">
          <h1 className="text-4xl font-bold mb-8 text-center mt-4">Exam Challenge</h1>
          <TooltipProvider>
            {children}
          </TooltipProvider>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
