import type { Metadata } from "next";
import { Inter, Hedvig_Letters_Serif } from "next/font/google";
import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import "./globals.css";

// Load Google Fonts using next/font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const hedvigLettersSerif = Hedvig_Letters_Serif({
  subsets: ["latin"],
  variable: "--font-hedvig-letters-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prudent Resources",
  description: "Your trusted resource partner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${hedvigLettersSerif.variable}`}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-gray-900">
        {/* Add TopBar here, before Navbar */}
        <TopBar />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}