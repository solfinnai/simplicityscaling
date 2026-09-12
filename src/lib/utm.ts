import { UTM_KEYS, type UtmKey } from "@/lib/forms";

export type UtmBag = Record<UtmKey, string>;

export function emptyUtms(): UtmBag {
  return UTM_KEYS.reduce((acc, key) => {
    acc[key] = "";
    return acc;
  }, {} as UtmBag);
}

export function readUtmsFromSearch(search: string): UtmBag {
  const params = new URLSearchParams(search.startsWith("?") ? search : `?${search}`);
  const bag = emptyUtms();
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) bag[key] = value.slice(0, 200);
  }
  return bag;
}

export function persistUtms(bag: UtmBag) {
  if (typeof window === "undefined") return;
  const hasAny = Object.values(bag).some(Boolean);
  if (!hasAny) return;
  try {
    sessionStorage.setItem("ss_utms", JSON.stringify(bag));
  } catch {
    /* ignore quota */
  }
}

export function loadPersistedUtms(): UtmBag {
  if (typeof window === "undefined") return emptyUtms();
  try {
    const raw = sessionStorage.getItem("ss_utms");
    if (!raw) return emptyUtms();
    const parsed = JSON.parse(raw) as Partial<UtmBag>;
    const bag = emptyUtms();
    for (const key of UTM_KEYS) {
      if (typeof parsed[key] === "string") bag[key] = parsed[key]!;
    }
    return bag;
  } catch {
    return emptyUtms();
  }
}

export function mergeUtms(primary: UtmBag, fallback: UtmBag): UtmBag {
  const bag = emptyUtms();
  for (const key of UTM_KEYS) {
    bag[key] = primary[key] || fallback[key] || "";
  }
  return bag;
}
