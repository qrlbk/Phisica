import { AppShell } from "@/components/layout/AppShell";
import { ChatWindow } from "@/components/ai/ChatWindow";

export default function AiPage() {
  return (
    <AppShell
      title="AI помощник"
      description="Задавай вопросы по физике и получай понятные пошаговые объяснения."
    >
      <ChatWindow />
    </AppShell>
  );
}
