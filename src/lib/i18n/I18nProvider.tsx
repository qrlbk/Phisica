"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { defaultLocale, Locale, messages } from "./translations";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);
const LOCALE_STORAGE_KEY = "ipw-locale";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") {
      return defaultLocale;
    }
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return stored && stored in messages ? (stored as Locale) : defaultLocale;
  });

  useEffect(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key: string) => messages[locale][key] ?? messages[defaultLocale][key] ?? key
    }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
