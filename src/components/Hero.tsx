"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Flame, MapPin } from "lucide-react";
import { CONTACT } from "@/data/locations";

const TICKER_ITEMS = [
  "🔥 WIR HABEN GEÖFFNET",
  "🍔 GRILLED BURGERS & WRAPS",
  "🌱 VEGGIE / VEGAN",
  "📍 POTSDAM & BERLIN",
  "🎉 BOOK US FOR YOUR EVENT",
  "🍕 PIZZA · BOWLS · CURRYWURST",
];

export default function Hero() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("de-DE", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(223,255,0,0.08)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(57,255,20,0.05)_0%,_transparent_50%)]" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-kasongo-lime/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-kasongo-green/5 rounded-full blur-3xl" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(223,255,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(223,255,0,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kasongo-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-kasongo-green" />
              </span>
              <span className="text-xs font-medium tracking-widest uppercase text-kasongo-green">
                Live · Potsdam
              </span>
              <span className="text-xs text-white/30 font-mono">{time}</span>
            </div>

            <h1 className="section-title text-white mb-4">
              STREET FOOD
              <br />
              <span className="text-gradient">MEETS EVENT</span>
            </h1>

            <p className="text-lg text-white/60 max-w-md mb-8 leading-relaxed">
              Premium Catering aus dem Food Truck. Burger, Wraps, Pizza & Bowls –
              frisch gegrillt in Potsdam & Berlin. Vegan? Klar!
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#live"
                className="group flex items-center gap-2 rounded-full lime-gradient px-8 py-4 font-bold text-black text-sm tracking-wide hover:scale-105 transition-transform"
              >
                <MapPin size={18} />
                FIND US LIVE
                <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
              </a>
              <a
                href="#book"
                className="flex items-center gap-2 rounded-full border border-kasongo-lime/30 px-8 py-4 font-bold text-kasongo-lime text-sm tracking-wide hover:bg-kasongo-lime/10 transition-colors"
              >
                <Flame size={18} />
                BOOK CATERING
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-white/40">
              <div>
                <span className="block text-2xl font-display text-kasongo-lime">4.8K+</span>
                Instagram Followers
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <span className="block text-2xl font-display text-kasongo-lime">45+</span>
                Events & Posts
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <span className="block text-2xl font-display text-kasongo-lime">100%</span>
                Fresh & Local
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 animate-glow rounded-full" />
              <Image
                src="/images/logo.png"
                alt="Kasongo Warthog"
                width={400}
                height={400}
                className="relative z-10 animate-float drop-shadow-2xl"
                priority
              />
              {/* Orbiting badges */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 glass rounded-full px-3 py-1 text-xs font-bold text-kasongo-lime">
                  🍔 BURGERS
                </span>
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <span className="absolute top-1/2 -right-8 glass rounded-full px-3 py-1 text-xs font-bold text-kasongo-green">
                  🌱 VEGAN
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Ticker */}
      <div className="relative border-t border-white/5 bg-black/50 overflow-hidden py-3">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="mx-8 text-sm font-bold tracking-widest text-white/30 uppercase">
              {item}
              <span className="mx-8 text-kasongo-lime">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
