import { useCallback, useState } from "react";
import { TIDEGLASS } from "../data/intel";
import type { Coords } from "./geo";

export type GeoStatus = "idle" | "pending" | "ready" | "denied" | "error";

export function useBookletLocation() {
  const [status, setStatus] = useState<GeoStatus>("idle");
  const [coords, setCoords] = useState<Coords | null>(null);
  const [source, setSource] = useState<"gps" | "tideglass" | null>(null);

  const useTideglass = useCallback(() => {
    setCoords({ lat: TIDEGLASS.lat, lng: TIDEGLASS.lng });
    setSource("tideglass");
    setStatus("ready");
  }, []);

  const requestGps = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("error");
      return;
    }
    setStatus("pending");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setSource("gps");
        setStatus("ready");
      },
      (err) => {
        setStatus(err.code === 1 ? "denied" : "error");
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60_000 },
    );
  }, []);

  const clear = useCallback(() => {
    setCoords(null);
    setSource(null);
    setStatus("idle");
  }, []);

  return { status, coords, source, requestGps, useTideglass, clear };
}
