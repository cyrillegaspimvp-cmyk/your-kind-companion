import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Volume2, MessageCircleQuestion } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { fractionLesson } from "@/lib/data";
import mascot from "@/assets/mascot.png";

export const Route = createFileRoute("/lesson")({
  head: () => ({
    meta: [
      { title: "Fractions Lesson — Study Buddy" },
      { name: "description", content: "Learn what fractions are with Hootie through pizza, chocolate, and fun visual examples." },
      { property: "og:title", content: "Fractions Lesson — Study Buddy" },
      { property: "og:description", content: "Learn fractions with Hootie the owl." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LessonPage,
});

function Pizza({ shaded, total }: { shaded: number; total: number }) {
  const slices = Array.from({ length: total }, (_, i) => {
    const a0 = (i / total) * 2 * Math.PI - Math.PI / 2;
    const a1 = ((i + 1) / total) * 2 * Math.PI - Math.PI / 2;
    const x0 = 50 + 45 * Math.cos(a0), y0 = 50 + 45 * Math.sin(a0);
    const x1 = 50 + 45 * Math.cos(a1), y1 = 50 + 45 * Math.sin(a1);
    return (
      <path key={i} d={`M50,50 L${x0},${y0} A45,45 0 0,1 ${x1},${y1} Z`}
        className={i < shaded ? "fill-sunny stroke-sunny-foreground" : "fill-card stroke-border"} strokeWidth={2} />
    );
  });
  return <svg viewBox="0 0 100 100" className="h-40 w-40">{slices}</svg>;
}

function LessonPage() {
  const [step, setStep] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const card = fractionLesson[step];
  const last = step === fractionLesson.length - 1;

  const readAloud = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(`${card.heading}. ${card.body}`);
    u.rate = 0.9;
    u.onend = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(u);
  };

  return (
    <AppShell>
      <p className="text-xs font-bold uppercase tracking-wide text-primary">Math Adventure · Grade 4 · Fractions</p>
      <div className="mt-2 flex items-center gap-2">
        {fractionLesson.map((_, i) => (
          <div key={i} className={`h-2.5 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
        ))}
      </div>
      <p className="mt-1 text-xs font-bold text-muted-foreground">Lesson {step + 1} of {fractionLesson.length}</p>

      <div key={step} className="card-play mt-4 animate-pop-in p-6">
        <div className="flex justify-center">
          {step === 0 ? <Pizza shaded={1} total={4} /> : step === 1 ? (
            <div className="flex flex-col items-center font-display text-6xl font-semibold">
              <span className="text-primary">3</span>
              <span className="my-1 h-1.5 w-16 rounded bg-foreground" />
              <span className="text-coral-foreground">4</span>
            </div>
          ) : <span className="text-8xl">{card.emoji}</span>}
        </div>
        {step === 1 && (
          <div className="mt-3 flex justify-center gap-3 text-xs font-bold">
            <span className="rounded-full bg-primary/15 px-3 py-1 text-primary">Top: parts we have</span>
            <span className="rounded-full bg-coral/25 px-3 py-1 text-coral-foreground">Bottom: total parts</span>
          </div>
        )}
        <h1 className="mt-5 font-display text-2xl font-semibold">{card.heading}</h1>
        <p className="mt-2 text-lg leading-relaxed">{card.body}</p>
        <button onClick={readAloud} className="btn-bounce mt-4 inline-flex items-center gap-2 rounded-full bg-sky/30 px-4 py-2 text-sm font-bold text-sky-foreground">
          <Volume2 className="h-4 w-4" /> {speaking ? "Reading..." : "Read aloud"}
        </button>
      </div>

      <div className="mt-4 flex items-start gap-3">
        <img src={mascot} alt="Hootie" width={1024} height={1024} loading="lazy" className="h-14 w-14" />
        <div className="rounded-2xl rounded-tl-sm bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground">
          {last ? "You did great! Ready to test what you learned? 🎯" : "Take your time. Tap Next when you're ready! 🦉"}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button disabled={step === 0} onClick={() => setStep(step - 1)} className="btn-bounce flex items-center gap-1 rounded-2xl border-2 border-border bg-card px-5 py-3 font-bold disabled:opacity-40">
          <ChevronLeft className="h-5 w-5" /> Back
        </button>
        {last ? (
          <Link to="/quiz" className="btn-bounce flex flex-1 items-center justify-center gap-1 rounded-2xl bg-fresh px-5 py-3 font-display text-lg font-semibold text-fresh-foreground shadow-[0_4px_0_var(--color-border)]">
            Start Quiz! 🎮
          </Link>
        ) : (
          <button onClick={() => setStep(step + 1)} className="btn-bounce flex flex-1 items-center justify-center gap-1 rounded-2xl bg-primary px-5 py-3 font-display text-lg font-semibold text-primary-foreground shadow-[0_4px_0_var(--color-border)]">
            Next <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      <Link to="/buddy" className="btn-bounce mt-3 flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary py-3 text-sm font-bold text-primary">
        <MessageCircleQuestion className="h-5 w-5" /> Ask a Question
      </Link>
    </AppShell>
  );
}
