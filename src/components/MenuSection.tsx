"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Flame, Star } from "lucide-react";
import { menuItems } from "@/data/menu";

type Filter = "all" | "vegan" | "veggie" | "popular";

const CATEGORIES = [
  { id: "all", label: "Alles" },
  { id: "burger", label: "Burger" },
  { id: "wrap", label: "Wraps" },
  { id: "pizza", label: "Pizza" },
  { id: "bowl", label: "Bowls" },
  { id: "currywurst", label: "Currywurst" },
];

export default function MenuSection() {
  const [category, setCategory] = useState("all");
  const [filter, setFilter] = useState<Filter>("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = menuItems.filter((item) => {
    if (category !== "all" && item.category !== category) return false;
    if (filter === "vegan" && !item.vegan) return false;
    if (filter === "veggie" && !item.veggie) return false;
    if (filter === "popular" && !item.popular) return false;
    return true;
  });

  return (
    <section id="menu" className="relative py-24 bg-gradient-to-b from-transparent via-kasongo-lime/[0.02] to-transparent">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-[0.3em] text-kasongo-lime uppercase">
            Unsere Karte
          </span>
          <h2 className="section-title text-white mt-2">
            GRILLED <span className="text-gradient">MENU</span>
          </h2>
          <p className="text-white/50 mt-3 max-w-lg mx-auto">
            Frisch vom Grill. Burger, Wraps, Pizza & mehr – mit veganen & vegetarischen Optionen.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                category === cat.id
                  ? "bg-kasongo-lime text-black"
                  : "glass text-white/50 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {(
            [
              { id: "all" as const, label: "Alle", icon: null },
              { id: "vegan" as const, label: "Vegan", icon: Leaf },
              { id: "veggie" as const, label: "Veggie", icon: Leaf },
              { id: "popular" as const, label: "Bestseller", icon: Star },
            ] as const
          ).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                filter === id
                  ? "bg-kasongo-green/20 text-kasongo-green border border-kasongo-green/30"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              {Icon && <Icon size={12} />}
              {label}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group relative glass rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                hoveredId === item.id
                  ? "border-kasongo-lime/30 scale-[1.02] shadow-lg shadow-kasongo-lime/10"
                  : "border-transparent"
              } border`}
            >
              {item.popular && (
                <span className="absolute -top-2 -right-2 flex items-center gap-1 rounded-full bg-kasongo-yellow px-2.5 py-0.5 text-[10px] font-bold text-black">
                  <Star size={10} fill="black" />
                  TOP
                </span>
              )}

              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{item.emoji}</span>
                <span className="text-lg font-display text-kasongo-lime">
                  {item.price}
                </span>
              </div>

              <h3 className="font-bold text-white text-lg mb-1">{item.nameDe}</h3>
              <p className="text-sm text-white/40 mb-4 leading-relaxed">
                {item.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {item.vegan && (
                    <span className="flex items-center gap-1 text-xs font-bold text-kasongo-green">
                      <Leaf size={12} /> VEGAN
                    </span>
                  )}
                  {item.veggie && !item.vegan && (
                    <span className="flex items-center gap-1 text-xs font-bold text-kasongo-green/70">
                      <Leaf size={12} /> VEGGIE
                    </span>
                  )}
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <Flame
                      key={j}
                      size={12}
                      className={
                        j < item.spicy
                          ? "text-kasongo-red"
                          : "text-white/10"
                      }
                      fill={j < item.spicy ? "currentColor" : "none"}
                    />
                  ))}
                </div>
              </div>

              {/* Hover reveal */}
              <motion.div
                initial={false}
                animate={{
                  opacity: hoveredId === item.id ? 1 : 0,
                  height: hoveredId === item.id ? "auto" : 0,
                }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-white/5">
                  <button className="w-full rounded-xl lime-gradient py-2.5 text-sm font-bold text-black">
                    Zum Event bestellen
                  </button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
