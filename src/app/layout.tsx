import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import "./globals.css";
import CustomLayout from "@/components/custom-layout";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Fitness Gym",
  description: "A gym and fitness website",
};

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${montserrat.className} antialiased`}>
          <CustomLayout>{children}</CustomLayout>
          <Toaster position="bottom-right" reverseOrder={false} />
        </body>
      </html>
    </ClerkProvider>
  );
}
