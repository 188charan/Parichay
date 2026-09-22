"use client";

import { useSyncExternalStore } from "react";

/**
 * Tracks the user's `prefers-reduced-motion` setting reactively.
 * Returns `true` when the user has requested reduced motion, so callers can
 * skip or simplify animations.
 *
 * Implemented with useSyncExternalStore — the idiomatic way to subscribe to an
 * external source (a media query) without an effect-driven setState. The
 * server snapshot is `false` so SSR renders the full (non-reduced) markup.
 */
const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
