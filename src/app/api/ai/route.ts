import { NextRequest, NextResponse } from "next/server";
import { isPhysicsQuestion } from "@/lib/ai/topicGuard";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { message?: string };
  const message = body.message?.trim() ?? "";

  if (!message) {
    return NextResponse.json({ error: "Введите вопрос." }, { status: 400 });
  }

  if (!isPhysicsQuestion(message)) {
    return NextResponse.json(
      { answer: "Я помогаю только с вопросами по физике школьного уровня. Попробуй переформулировать вопрос." },
      { status: 200 }
    );
  }

  return NextResponse.json({
    answer:
      "Шаг 1: Определи известные величины.\nШаг 2: Выбери формулу из школьной физики.\nШаг 3: Подставь значения и проверь единицы измерения.\nЕсли хочешь, пришли конкретные числа, и я решу задачу пошагово."
  });
}
