"use client";

import { useCallback, useSyncExternalStore } from "react";

function storageKey(formType: string) {
  return `ss_draft_${formType}`;
}

const memory = new Map<string, string>();
const listeners = new Map<string, Set<() => void>>();
const subscribeCache = new Map<string, (onStoreChange: () => void) => () => void>();

function emit(key: string) {
  listeners.get(key)?.forEach((listener) => listener());
}

function subscribeToKey(key: string) {
  const cached = subscribeCache.get(key);
  if (cached) return cached;

  const subscribe = (onStoreChange: () => void) => {
    const set = listeners.get(key) ?? new Set<() => void>();
    set.add(onStoreChange);
    listeners.set(key, set);

    const onStorage = (event: StorageEvent) => {
      if (event.key === key) {
        if (event.newValue == null) memory.delete(key);
        else memory.set(key, event.newValue);
        onStoreChange();
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      set.delete(onStoreChange);
      window.removeEventListener("storage", onStorage);
    };
  };

  subscribeCache.set(key, subscribe);
  return subscribe;
}

function readSession(key: string) {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSession(key: string, value: string | null) {
  try {
    if (value === null) sessionStorage.removeItem(key);
    else sessionStorage.setItem(key, value);
  } catch {
    /* private mode / quota */
  }
}

function readRaw(key: string) {
  if (memory.has(key)) return memory.get(key) ?? "";
  const fromSession = readSession(key);
  if (fromSession != null) {
    memory.set(key, fromSession);
    return fromSession;
  }
  return "";
}

function writeRaw(key: string, value: string | null) {
  if (value === null) memory.delete(key);
  else memory.set(key, value);
  writeSession(key, value);
  emit(key);
}

function parseDraft<T extends Record<string, unknown>>(raw: string, fallback: T): T {
  if (!raw) return fallback;
  try {
    return { ...fallback, ...(JSON.parse(raw) as Partial<T>) };
  } catch {
    return fallback;
  }
}

const snapshotFns = new Map<string, () => string>();

function snapshotOf(key: string) {
  const cached = snapshotFns.get(key);
  if (cached) return cached;
  const read = () => readRaw(key);
  snapshotFns.set(key, read);
  return read;
}

export function useFormDraft<T extends Record<string, unknown>>(formType: string, initial: T) {
  const key = storageKey(formType);
  const raw = useSyncExternalStore(subscribeToKey(key), snapshotOf(key), () => "");
  const values = parseDraft(raw, initial);

  const update = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      const current = parseDraft(readRaw(key), initial);
      writeRaw(key, JSON.stringify({ ...current, [field]: value }));
    },
    [initial, key],
  );

  const clear = useCallback(() => {
    writeRaw(key, null);
  }, [key]);

  return { values, update, clear };
}
