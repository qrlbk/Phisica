"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";

type Message = { role: "user" | "assistant"; text: string };

export function ChatWindow() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const message = input.trim();
    if (!message || loading) {
      return;
    }

    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", text: message }]);
    setInput("");

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });
      const data = (await response.json()) as { answer?: string; error?: string };

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.answer ?? data.error ?? "Ошибка обработки запроса." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="flex h-[560px] flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">AI помощник по физике</h3>
        <p className="mt-1 text-sm text-white/70">Объясняет темы и задачи только в пределах школьной физики.</p>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto rounded-xl border border-white/10 bg-black/20 p-3">
        {messages.length === 0 && <p className="text-sm text-white/50">Например: «Как найти ускорение, если F=12 Н и m=3 кг?»</p>}
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
              message.role === "user" ? "ml-auto bg-cyan-500/30 text-white" : "bg-white/10 text-white/90"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              void sendMessage();
            }
          }}
          placeholder="Задай вопрос по физике..."
          className="flex-1 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
        />
        <button
          type="button"
          onClick={() => void sendMessage()}
          disabled={loading}
          className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950 disabled:opacity-60"
        >
          {loading ? "..." : "Отправить"}
        </button>
      </div>
    </GlassCard>
  );
}
