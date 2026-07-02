import type { Metadata } from "next";
import { Space_Grotesk, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Kasongo | Street Food & Catering – Potsdam & Berlin",
  description:
    "Premium Street Food Catering aus Potsdam & Berlin. Burger, Wraps, Pizza, Bowls & Currywurst. Vegan & Veggie. Book us for your event!",
  keywords: [
    "street food",
    "catering",
    "potsdam",
    "berlin",
    "food truck",
    "burger",
    "vegan",
    "event catering",
    "kasongo",
  ],
  openGraph: {
    title: "Kasongo Street Food & Catering",
    description: "Book us for your event! Premium Street Food in Potsdam & Berlin.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${spaceGrotesk.variable} ${bebasNeue.variable} scroll-smooth`}>
      <body className="grain min-h-screen bg-background text-foreground antialiased">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
