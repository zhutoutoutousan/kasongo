import type { GeoPoint, TruckLocation } from "@/lib/types";

export const CITY_CENTERS: Record<"potsdam" | "berlin", GeoPoint & { zoom: number }> = {
  potsdam: { lat: 52.3906, lng: 13.0645, zoom: 12.5 },
  berlin: { lat: 52.52, lng: 13.405, zoom: 11.5 },
};

export const HEAT_ZONES = [
  { city: "potsdam" as const, center: { lat: 52.3934, lng: 13.0921 }, radius: 800, intensity: 0.9, label: "Home Base" },
  { city: "potsdam" as const, center: { lat: 52.3905, lng: 13.0645 }, radius: 600, intensity: 0.7, label: "Metropolis Halle" },
  { city: "potsdam" as const, center: { lat: 52.4044, lng: 13.0383 }, radius: 500, intensity: 0.5, label: "Sanssouci" },
  { city: "berlin" as const, center: { lat: 52.5163, lng: 13.3777 }, radius: 700, intensity: 0.85, label: "Mitte" },
  { city: "berlin" as const, center: { lat: 52.5432, lng: 13.4028 }, radius: 500, intensity: 0.6, label: "Prenzlauer Berg" },
  { city: "berlin" as const, center: { lat: 52.5219, lng: 13.4132 }, radius: 600, intensity: 0.75, label: "Alexanderplatz" },
];

export const TRUCK_ROUTE: GeoPoint[] = [
  { lat: 52.3934, lng: 13.0921 },
  { lat: 52.391, lng: 13.08 },
  { lat: 52.388, lng: 13.07 },
  { lat: 52.385, lng: 13.055 },
  { lat: 52.39, lng: 13.04 },
];

export function getInitialTruckLocation(): TruckLocation {
  return {
    city: "potsdam",
    position: { lat: 52.3934, lng: 13.0921 },
    status: "open",
    message: "Ready 🔥 Wir haben geöffnet – kommt vorbei!",
    updatedAt: new Date().toISOString(),
    queueMinutes: 8,
  };
}

export const CONTACT = {
  phone: "+49 162 2369284",
  phoneDisplay: "+49 162 2369284",
  address: "Marlene-Dietrich-Allee 15, 14482 Potsdam",
  instagram: "https://www.instagram.com/kasongo.streetfoodcatering/",
  instagramHandle: "@kasongo.streetfoodcatering",
  email: "hello@kasongo-streetfood.de",
};
