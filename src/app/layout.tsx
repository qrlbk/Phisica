import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export const metadata: Metadata = {
  title: "Interactive Physics World",
  description: "Educational platform with interactive physics modules."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="kk">
      <body>
        <I18nProvider>
          <LanguageSwitcher />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
