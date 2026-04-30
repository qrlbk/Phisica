import { NextRequest, NextResponse } from "next/server";
import { isPhysicsQuestion } from "@/lib/ai/topicGuard";
import { Locale, defaultLocale, messages } from "@/lib/i18n/translations";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { message?: string; locale?: Locale };
  const locale: Locale = body.locale && body.locale in messages ? body.locale : defaultLocale;
  const t = (key: string) => messages[locale][key] ?? messages[defaultLocale][key] ?? key;
  const message = body.message?.trim() ?? "";

  if (!message) {
    return NextResponse.json({ error: t("api.askQuestion") }, { status: 400 });
  }

  if (!isPhysicsQuestion(message)) {
    return NextResponse.json(
      { answer: t("api.physicsOnly") },
      { status: 200 }
    );
  }

  return NextResponse.json({
    answer: t("api.stepAnswer")
  });
}
