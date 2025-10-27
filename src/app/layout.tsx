import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../app/styles/globals.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import GoogleTagManager from './components/gTagManager';
import FloatingContact from "./components/FloatingContact";
import DialogBox from './components/dialogBox/dialogBox';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | My Booking Help",
    default: "My Booking Help",
  },
  description: "Cover your journey in no time with our travel booking service.",
  icons: {
    icon: "/logo.png",
  },
  keywords: ["travel", "flight", "booking", "drive", "hotel", "trip"],
  openGraph: {
    title: "My Booking Help",
    description:
      "Cover your journey in no time with our travel booking service.",
    url: "https://www.mybookinghelp.com",
    siteName: "My Booking Help",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "My Booking Help",
      },
    ],
    locale: "en_US",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   
  
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GoogleTagManager />
        <Navbar />
        <div className="sm:pt-[100px] md:pt-[80px]">
          {children}
          <DialogBox />
          <FloatingContact />
        </div>
        <Footer />
      </body>
    </html>
  );
}