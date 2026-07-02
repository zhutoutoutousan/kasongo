"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { CONTACT } from "@/data/locations";

const NAV_LINKS = [
  { href: "#live", label: "Live Map" },
  { href: "#menu", label: "Menu" },
  { href: "#events", label: "Events" },
  { href: "#play", label: "Play" },
  { href: "#book", label: "Book Us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/logo.png"
            alt="Kasongo Logo"
            width={48}
            height={48}
            className="rounded-full group-hover:animate-float transition-transform"
          />
          <div className="hidden sm:block">
            <span className="font-display text-xl tracking-widest text-kasongo-lime">
              KASONGO
            </span>
            <p className="text-[10px] tracking-[0.3em] text-white/50 uppercase">
              Street Food & Catering
            </p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-white/70 hover:text-kasongo-lime transition-colors uppercase"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-kasongo-lime transition-colors text-sm font-bold"
            aria-label="Instagram"
          >
            IG
          </a>
          <a
            href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 rounded-full bg-kasongo-lime px-5 py-2 text-sm font-bold text-black hover:bg-kasongo-yellow transition-colors"
          >
            <Phone size={16} />
            Book Now
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white p-2"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden glass border-t border-white/10 mt-2 mx-4 rounded-2xl p-6 animate-slide-up">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-lg font-medium text-white/80 hover:text-kasongo-lime border-b border-white/5 last:border-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-kasongo-lime px-6 py-3 font-bold text-black"
          >
            <Phone size={18} />
            {CONTACT.phoneDisplay}
          </a>
        </div>
      )}
    </header>
  );
}
