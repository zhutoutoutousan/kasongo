"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Navigation,
  Radio,
  Clock,
  Users,
  Crosshair,
  Zap,
} from "lucide-react";
import type { City } from "@/lib/types";
import { events } from "@/data/events";
import {
  CITY_CENTERS,
  HEAT_ZONES,
  TRUCK_ROUTE,
  getInitialTruckLocation,
  CONTACT,
} from "@/data/locations";

type MapMode = "live" | "events" | "heat";

export default function LiveMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const truckMarkerRef = useRef<maplibregl.Marker | null>(null);
  const [city, setCity] = useState<City>("all");
  const [mode, setMode] = useState<MapMode>("live");
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [truck, setTruck] = useState(getInitialTruckLocation);
  const [routeIndex, setRouteIndex] = useState(0);
  const [mapReady, setMapReady] = useState(false);

  const filteredEvents = events.filter(
    (e) => city === "all" || e.city === city
  );

  const initMap = useCallback(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: [
              "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
              "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
              "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
            ],
            tileSize: 256,
            attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center: [13.0645, 52.39],
      zoom: 11,
      pitch: 45,
      bearing: -10,
    });

    map.addControl(
      new maplibregl.NavigationControl({ visualizePitch: true }),
      "top-right"
    );

    map.on("load", () => {
      // Route line
      map.addSource("truck-route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: TRUCK_ROUTE.map((p) => [p.lng, p.lat]),
          },
        },
      });
      map.addLayer({
        id: "route-line",
        type: "line",
        source: "truck-route",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": "#dfff00",
          "line-width": 3,
          "line-opacity": 0.6,
          "line-dasharray": [2, 2],
        },
      });

      // Heat zones
      HEAT_ZONES.forEach((zone, i) => {
        const points = 32;
        const coords: [number, number][] = [];
        for (let j = 0; j <= points; j++) {
          const angle = (j / points) * 2 * Math.PI;
          const dx = (zone.radius / 111320) * Math.cos(angle);
          const dy =
            (zone.radius / (111320 * Math.cos((zone.center.lat * Math.PI) / 180))) *
            Math.sin(angle);
          coords.push([zone.center.lng + dy, zone.center.lat + dx]);
        }
        map.addSource(`heat-${i}`, {
          type: "geojson",
          data: {
            type: "Feature",
            properties: { label: zone.label, intensity: zone.intensity },
            geometry: { type: "Polygon", coordinates: [coords] },
          },
        });
        map.addLayer({
          id: `heat-fill-${i}`,
          type: "fill",
          source: `heat-${i}`,
          paint: {
            "fill-color": "#dfff00",
            "fill-opacity": zone.intensity * 0.15,
          },
          layout: { visibility: "none" },
        });
      });

      setMapReady(true);
    });

    mapRef.current = map;

    // Truck marker
    const el = document.createElement("div");
    el.innerHTML = `
      <div style="position:relative;width:48px;height:48px;">
        <div style="position:absolute;inset:0;border-radius:50%;background:rgba(223,255,0,0.3);animation:pulse-ring 2s infinite;"></div>
        <div style="position:absolute;inset:4px;border-radius:50%;background:#dfff00;display:flex;align-items:center;justify-content:center;font-size:24px;border:2px solid #000;">🐗</div>
      </div>
    `;
    const marker = new maplibregl.Marker({ element: el })
      .setLngLat([TRUCK_ROUTE[0].lng, TRUCK_ROUTE[0].lat])
      .addTo(map);
    truckMarkerRef.current = marker;

    // Event markers
    events.forEach((event) => {
      const markerEl = document.createElement("div");
      const isLive = event.status === "live";
      markerEl.innerHTML = `
        <div style="cursor:pointer;padding:6px 10px;border-radius:20px;font-size:11px;font-weight:700;white-space:nowrap;
          background:${isLive ? "#39ff14" : "#333"};color:${isLive ? "#000" : "#dfff00"};
          border:2px solid ${isLive ? "#39ff14" : "#dfff00"};font-family:system-ui;">
          ${isLive ? "🔴 LIVE" : "📅"} ${event.title.slice(0, 15)}
        </div>
      `;
      markerEl.addEventListener("click", () => setSelectedEvent(event.id));
      new maplibregl.Marker({ element: markerEl })
        .setLngLat([event.location.lng, event.location.lat])
        .addTo(map);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const cleanup = initMap();
    return cleanup;
  }, [initMap]);

  // Fly to city
  useEffect(() => {
    if (!mapRef.current) return;
    if (city === "all") {
      mapRef.current.flyTo({ center: [13.2, 52.45], zoom: 10.5, pitch: 45, duration: 1500 });
    } else {
      const c = CITY_CENTERS[city];
      mapRef.current.flyTo({
        center: [c.lng, c.lat],
        zoom: c.zoom,
        pitch: 50,
        duration: 1500,
      });
    }
  }, [city]);

  // Toggle heat map layers
  useEffect(() => {
    if (!mapRef.current || !mapReady) return;
    const map = mapRef.current;
    HEAT_ZONES.forEach((_, i) => {
      const layerId = `heat-fill-${i}`;
      if (map.getLayer(layerId)) {
        map.setLayoutProperty(
          layerId,
          "visibility",
          mode === "heat" ? "visible" : "none"
        );
      }
    });
    if (map.getLayer("route-line")) {
      map.setLayoutProperty(
        "route-line",
        "visibility",
        mode === "live" ? "visible" : "none"
      );
    }
  }, [mode, mapReady]);

  // Simulate truck movement
  useEffect(() => {
    if (mode !== "live") return;
    const interval = setInterval(() => {
      setRouteIndex((prev) => {
        const next = (prev + 1) % TRUCK_ROUTE.length;
        const pos = TRUCK_ROUTE[next];
        truckMarkerRef.current?.setLngLat([pos.lng, pos.lat]);
        setTruck((t) => ({
          ...t,
          position: pos,
          updatedAt: new Date().toISOString(),
          queueMinutes: Math.max(3, Math.floor(Math.random() * 15)),
        }));
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [mode]);

  const selected = events.find((e) => e.id === selectedEvent);

  const flyToTruck = () => {
    mapRef.current?.flyTo({
      center: [truck.position.lng, truck.position.lat],
      zoom: 15,
      pitch: 60,
      duration: 2000,
    });
  };

  return (
    <section id="live" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10">
          <span className="text-xs font-bold tracking-[0.3em] text-kasongo-lime uppercase">
            Real-Time Radar
          </span>
          <h2 className="section-title text-white mt-2">
            LIVE <span className="text-gradient">MAP</span>
          </h2>
          <p className="text-white/50 mt-3 max-w-xl">
            Verfolge unseren Food Truck in Echtzeit durch Potsdam & Berlin.
            Events, Heat Zones & Live-Status – alles auf einen Blick.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sidebar controls */}
          <div className="space-y-4 order-2 lg:order-1">
            {/* Live status card */}
            <motion.div
              layout
              className="glass rounded-2xl p-5 border border-kasongo-green/20"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kasongo-green opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-kasongo-green" />
                </span>
                <span className="text-sm font-bold text-kasongo-green uppercase tracking-wider">
                  {truck.status === "open" ? "Geöffnet" : truck.status}
                </span>
              </div>
              <p className="text-white font-medium mb-4">{truck.message}</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-white/50">
                  <Clock size={14} className="text-kasongo-lime" />
                  <span>~{truck.queueMinutes} Min Wartezeit</span>
                </div>
                <div className="flex items-center gap-2 text-white/50">
                  <Users size={14} className="text-kasongo-lime" />
                  <span>{Math.floor(Math.random() * 8) + 3} in Queue</span>
                </div>
              </div>
              <button
                onClick={flyToTruck}
                className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-kasongo-lime/10 border border-kasongo-lime/30 py-2.5 text-sm font-bold text-kasongo-lime hover:bg-kasongo-lime/20 transition-colors"
              >
                <Crosshair size={16} />
                Zum Truck navigieren
              </button>
            </motion.div>

            {/* City filter */}
            <div className="glass rounded-2xl p-5">
              <p className="text-xs font-bold tracking-widest text-white/40 uppercase mb-3">
                Stadt
              </p>
              <div className="flex gap-2">
                {(["all", "potsdam", "berlin"] as City[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCity(c)}
                    className={`flex-1 rounded-xl py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                      city === c
                        ? "bg-kasongo-lime text-black"
                        : "bg-white/5 text-white/50 hover:bg-white/10"
                    }`}
                  >
                    {c === "all" ? "Beide" : c}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode switch */}
            <div className="glass rounded-2xl p-5">
              <p className="text-xs font-bold tracking-widest text-white/40 uppercase mb-3">
                Modus
              </p>
              <div className="space-y-2">
                {(
                  [
                    { id: "live" as const, icon: Radio, label: "Live Tracking" },
                    { id: "events" as const, icon: MapPin, label: "Events" },
                    { id: "heat" as const, icon: Zap, label: "Heat Zones" },
                  ] as const
                ).map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setMode(id)}
                    className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      mode === id
                        ? "bg-kasongo-lime/15 text-kasongo-lime border border-kasongo-lime/30"
                        : "text-white/50 hover:bg-white/5"
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Event list */}
            <div className="glass rounded-2xl p-5 max-h-64 overflow-y-auto">
              <p className="text-xs font-bold tracking-widest text-white/40 uppercase mb-3">
                {filteredEvents.length} Events
              </p>
              <div className="space-y-2">
                {filteredEvents.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => {
                      setSelectedEvent(event.id);
                      mapRef.current?.flyTo({
                        center: [event.location.lng, event.location.lat],
                        zoom: 15,
                        duration: 1500,
                      });
                    }}
                    className={`w-full text-left rounded-xl px-3 py-2.5 transition-all ${
                      selectedEvent === event.id
                        ? "bg-kasongo-lime/10 border border-kasongo-lime/20"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {event.status === "live" && (
                        <span className="text-kasongo-green text-xs">● LIVE</span>
                      )}
                      <span className="text-sm font-medium text-white truncate">
                        {event.title}
                      </span>
                    </div>
                    <p className="text-xs text-white/30 mt-0.5">
                      {event.date} · {event.time} · {event.city}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2 order-1 lg:order-2 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-kasongo-lime/5">
              <div ref={mapContainer} className="w-full h-[500px] lg:h-[600px]" />

              {/* Radar overlay */}
              {mode === "live" && (
                <div className="absolute top-4 left-4 pointer-events-none">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border border-kasongo-lime/20" />
                    <div className="absolute inset-2 rounded-full border border-kasongo-lime/10" />
                    <div
                      className="absolute inset-0 rounded-full animate-radar origin-center"
                      style={{
                        background:
                          "conic-gradient(from 0deg, transparent 0deg, rgba(223,255,0,0.15) 30deg, transparent 60deg)",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Radio size={14} className="text-kasongo-lime" />
                    </div>
                  </div>
                </div>
              )}

              {/* Selected event popup */}
              <AnimatePresence>
                {selected && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-4 left-4 right-4 glass rounded-xl p-4 border border-kasongo-lime/20"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-white">{selected.title}</h3>
                        <p className="text-sm text-white/50 mt-1">
                          {selected.venue} · {selected.date} {selected.time}
                        </p>
                        <p className="text-sm text-white/40 mt-2">
                          {selected.description}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedEvent(null)}
                        className="text-white/30 hover:text-white text-lg"
                      >
                        ×
                      </button>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {selected.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-kasongo-lime/10 text-kasongo-lime"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${selected.location.lat},${selected.location.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-kasongo-lime hover:underline"
                    >
                      <Navigation size={14} />
                      Route planen
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
