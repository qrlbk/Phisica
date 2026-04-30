"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";
import { Locale } from "@/lib/i18n/translations";

const options: Array<{ id: Locale; label: string }> = [
  { id: "kk", label: "Қазақша" },
  { id: "ru", label: "Русский" },
  { id: "en", label: "English" }
];

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <label className="fixed right-4 top-4 z-[220] flex items-center gap-2 rounded-lg border border-white/20 bg-slate-950/90 px-3 py-1.5 text-xs text-white/90">
      <span>{t("lang.label")}:</span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        className="rounded bg-slate-900 px-1 py-0.5 text-xs"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
