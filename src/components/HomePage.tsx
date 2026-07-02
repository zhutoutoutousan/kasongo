"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import EventsSection from "@/components/EventsSection";
import PlaySection from "@/components/PlaySection";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";

const LiveMap = dynamic(() => import("@/components/LiveMap"), {
  ssr: false,
  loading: () => (
    <div className="py-24 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-kasongo-lime border-t-transparent animate-spin" />
        <p className="text-sm text-white/40">Karte wird geladen...</p>
      </div>
    </div>
  ),
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <LiveMap />
      <MenuSection />
      <EventsSection />
      <PlaySection />
      <BookingSection />
      <Footer />
    </>
  );
}
