export type City = "potsdam" | "berlin" | "all";

export type EventStatus = "live" | "upcoming" | "past";

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface KasongoEvent {
  id: string;
  title: string;
  city: "potsdam" | "berlin";
  location: GeoPoint;
  address: string;
  venue: string;
  date: string;
  time: string;
  status: EventStatus;
  description: string;
  tags: string[];
  featured?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  nameDe: string;
  description: string;
  category: "burger" | "wrap" | "pizza" | "bowl" | "currywurst" | "special";
  price: string;
  vegan: boolean;
  veggie: boolean;
  spicy: number;
  popular?: boolean;
  emoji: string;
}

export interface TruckLocation {
  city: "potsdam" | "berlin";
  position: GeoPoint;
  status: "open" | "cooking" | "en-route" | "closed";
  message: string;
  updatedAt: string;
  queueMinutes: number;
}
