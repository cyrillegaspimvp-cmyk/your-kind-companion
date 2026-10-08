import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, Trash2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { buddyReplies, defaultReply, suggestedQuestions } from "@/lib/data";
import mascot from "@/assets/mascot.png";

export const Route = createFileRoute("/buddy")({
  head: () => ({
    meta: [
      { title: "Ask Hootie — Study Buddy" },
      { name: "description", content: "Chat with Hootie the owl for simple explanations, examples, and hints." },
      { property: "og:title", content: "Ask Hootie — Study Buddy" },
      { property: "og:description", content: "Chat with your friendly study buddy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BuddyPage,
});

type Msg = { from: "me" | "buddy"; text: string };
const greeting: Msg = { from: "buddy", text: "Hi there! I'm Hootie 🦉 What would you like to learn about today?" };

function replyFor(text: string) {
  const t = text.toLowerCase();
  return buddyReplies.find((r) => r.keywords.some((k) => t.includes(k)))?.reply ?? defaultReply;
}

function BuddyPage() {
  const [messages, setMessages] = useState<Msg[]>([greeting]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim() || typing) return;
    setMessages((m) => [...m, { from: "me", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { from: "buddy", text: replyFor(text) }]);
      setTyping(false);
    }, 900);
  };

  return (
    <AppShell>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Ask Hootie 💬</h1>
        <button onClick={() => setMessages([greeting])} className="btn-bounce flex items-center gap-1 rounded-full border-2 border-border bg-card px-3 py-1.5 text-xs font-bold text-muted-foreground">
          <Trash2 className="h-4 w-4" /> Clear
        </button>
      </div>

      <div className="mt-4 space-y-3 pb-48">
        {messages.map((m, i) => m.from === "buddy" ? (
          <div key={i} className="flex animate-pop-in items-end gap-2">
            <img src={mascot} alt="Hootie" width={1024} height={1024} loading="lazy" className="h-10 w-10" />
            <div className="max-w-[80%] rounded-3xl rounded-bl-md bg-card border-2 border-border px-4 py-3 font-semibold">{m.text}</div>
          </div>
        ) : (
          <div key={i} className="flex animate-pop-in justify-end">
            <div className="max-w-[80%] rounded-3xl rounded-br-md bg-primary px-4 py-3 font-semibold text-primary-foreground">{m.text}</div>
          </div>
        ))}
        {typing && (
          <div className="flex items-end gap-2">
            <img src={mascot} alt="" width={1024} height={1024} loading="lazy" className="h-10 w-10" />
            <div className="rounded-3xl bg-card border-2 border-border px-4 py-3 font-bold text-muted-foreground">Hootie is thinking...</div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="fixed inset-x-0 bottom-[68px] z-10 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-3xl px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button onClick={() => send("Explain it simply")} className="btn-bounce shrink-0 rounded-full bg-sky/30 px-3 py-1.5 text-xs font-bold text-sky-foreground">🧸 Explain It Simply</button>
            <button onClick={() => send("Give me an example")} className="btn-bounce shrink-0 rounded-full bg-fresh/30 px-3 py-1.5 text-xs font-bold text-fresh-foreground">🍫 Give Me an Example</button>
            <button onClick={() => send("Give me a hint")} className="btn-bounce shrink-0 rounded-full bg-sunny/40 px-3 py-1.5 text-xs font-bold text-sunny-foreground">💡 Give Me a Hint</button>
          </div>
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 pb-2">
              {suggestedQuestions.slice(0, 1).map((q) => (
                <button key={q} onClick={() => send(q)} className="btn-bounce rounded-full border-2 border-primary px-3 py-1 text-xs font-bold text-primary">{q}</button>
              ))}
            </div>
          )}
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your question..."
              className="flex-1 rounded-2xl border-2 border-border bg-card px-4 py-3 font-semibold outline-none focus:border-primary" />
            <button type="submit" aria-label="Send" className="btn-bounce rounded-2xl bg-primary px-4 text-primary-foreground"><Send className="h-5 w-5" /></button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
