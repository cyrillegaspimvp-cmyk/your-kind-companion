import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, RotateCcw, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { fractionQuiz } from "@/lib/data";
import mascot from "@/assets/mascot.png";

type Search = { score: number; total: number; wrong: string };

export const Route = createFileRoute("/results")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    score: Number(s.score ?? 4),
    total: Number(s.total ?? 5),
    wrong: String(s.wrong ?? "3"),
  }),
  head: () => ({
    meta: [
      { title: "Your Results — Study Buddy" },
      { name: "description", content: "See your quiz score, stars earned, and topics to review." },
      { property: "og:title", content: "Your Results — Study Buddy" },
      { property: "og:description", content: "See your quiz score and rewards." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  const { score, total, wrong } = Route.useSearch();
  const pct = total ? Math.round((score / total) * 100) : 0;
  const stars = pct >= 90 ? 3 : pct >= 60 ? 2 : pct > 0 ? 1 : 0;
  const wrongIdx = wrong ? wrong.split(",").filter(Boolean).map(Number) : [];

  return (
    <AppShell>
      <div className="text-center">
        <img src={mascot} alt="Hootie celebrating" width={1024} height={1024} className="mx-auto h-32 w-32 animate-wiggle" />
        <h1 className="mt-2 font-display text-3xl font-semibold">{pct >= 60 ? "Amazing job! 🎉" : "Great effort! 💪"}</h1>
        <div className="mt-3 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <Star key={i} style={{ animationDelay: `${i * 0.15}s` }}
              className={`h-12 w-12 animate-pop-in ${i < stars ? "fill-sunny text-sunny-foreground" : "text-border"}`} />
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        <div className="card-play p-4"><p className="font-display text-2xl font-semibold text-primary">{score}/{total}</p><p className="text-xs font-bold text-muted-foreground">Score</p></div>
        <div className="card-play p-4"><p className="font-display text-2xl font-semibold text-fresh-foreground">{pct}%</p><p className="text-xs font-bold text-muted-foreground">Accuracy</p></div>
        <div className="card-play p-4"><p className="font-display text-2xl font-semibold text-sunny-foreground">+{score * 2}</p><p className="text-xs font-bold text-muted-foreground">Stars</p></div>
      </div>

      <h2 className="mt-6 font-display text-lg font-semibold">How you did</h2>
      <div className="mt-2 space-y-2">
        {fractionQuiz.map((q, i) => {
          const ok = !wrongIdx.includes(i);
          return (
            <div key={i} className={`flex items-center gap-3 rounded-2xl p-3 text-sm font-semibold ${ok ? "bg-fresh/25 text-fresh-foreground" : "bg-coral/20 text-coral-foreground"}`}>
              <span>{ok ? "✅" : "❌"}</span><span className="flex-1">{q.question}</span>
            </div>
          );
        })}
      </div>

      {wrongIdx.length > 0 && (
        <div className="mt-5 rounded-2xl bg-sunny/40 p-4 text-sunny-foreground">
          <p className="font-display font-semibold">📖 Topics to review</p>
          <p className="mt-1 text-sm font-semibold">Comparing fractions · Numerator & denominator</p>
        </div>
      )}

      {pct >= 60 && (
        <div className="card-play mt-5 flex animate-pop-in items-center gap-3 p-4">
          <span className="text-4xl">⭐</span>
          <div><p className="font-display font-semibold">New badge: Quiz Star!</p><p className="text-sm text-muted-foreground">You scored 60% or more on a quiz.</p></div>
        </div>
      )}

      <div className="mt-6 flex gap-3">
        <Link to="/quiz" className="btn-bounce flex items-center gap-1 rounded-2xl border-2 border-border bg-card px-5 py-3 font-bold"><RotateCcw className="h-5 w-5" /> Retry</Link>
        <Link to="/lesson" className="btn-bounce flex flex-1 items-center justify-center gap-1 rounded-2xl bg-primary py-3 font-display text-lg font-semibold text-primary-foreground shadow-[0_4px_0_var(--color-border)]">Next Lesson <ArrowRight className="h-5 w-5" /></Link>
      </div>
    </AppShell>
  );
}
