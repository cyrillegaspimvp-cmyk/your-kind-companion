import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, BookCheck, Clock } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { badges, subjects, weeklyActivity } from "@/lib/data";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "My Progress — Study Buddy" },
      { name: "description", content: "Track lessons completed, weekly learning time, subject progress, and badges." },
      { property: "og:title", content: "My Progress — Study Buddy" },
      { property: "og:description", content: "Track your learning journey." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProgressPage,
});

const barMap = { primary: "bg-primary", sunny: "bg-sunny", fresh: "bg-fresh", sky: "bg-sky", coral: "bg-coral" };

function ProgressPage() {
  const max = Math.max(...weeklyActivity.map((d) => d.minutes), 1);

  return (
    <AppShell>
      <h1 className="font-display text-2xl font-semibold">My Progress 🌱</h1>
      <p className="text-sm text-muted-foreground">Every little bit of learning counts!</p>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div className="card-play p-3"><BookCheck className="mx-auto h-6 w-6 text-primary" /><p className="mt-1 font-display text-xl font-semibold">12</p><p className="text-[11px] font-bold text-muted-foreground">Lessons done</p></div>
        <div className="card-play p-3"><Flame className="mx-auto h-6 w-6 text-coral-foreground" /><p className="mt-1 font-display text-xl font-semibold">3 days</p><p className="text-[11px] font-bold text-muted-foreground">Streak</p></div>
        <div className="card-play p-3"><Clock className="mx-auto h-6 w-6 text-sky-foreground" /><p className="mt-1 font-display text-xl font-semibold">110m</p><p className="text-[11px] font-bold text-muted-foreground">This week</p></div>
      </div>

      <section className="card-play mt-5 p-5">
        <h2 className="font-display text-lg font-semibold">This week</h2>
        <div className="mt-4 flex h-36 items-end justify-between gap-2">
          {weeklyActivity.map((d) => (
            <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex w-full flex-1 items-end">
                <div className={`w-full rounded-t-xl ${d.minutes ? "bg-primary" : "bg-muted"}`} style={{ height: `${Math.max((d.minutes / max) * 100, 6)}%` }} />
              </div>
              <span className="text-xs font-bold text-muted-foreground">{d.day}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="card-play mt-5 p-5">
        <h2 className="font-display text-lg font-semibold">Subjects</h2>
        <div className="mt-3 space-y-3">
          {subjects.map((s) => {
            const avg = Math.round(s.topics.reduce((a, t) => a + t.completion, 0) / s.topics.length);
            return (
              <div key={s.id}>
                <div className="flex justify-between text-sm font-bold"><span>{s.name}</span><span className="text-muted-foreground">{avg}%</span></div>
                <div className="mt-1 h-3 overflow-hidden rounded-full bg-muted"><div className={`h-full rounded-full ${barMap[s.color]}`} style={{ width: `${avg}%` }} /></div>
              </div>
            );
          })}
        </div>
      </section>

      <h2 className="mt-6 font-display text-lg font-semibold">Badges</h2>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {badges.map((b) => (
          <div key={b.id} className={`card-play flex flex-col items-center gap-1 p-3 ${b.earned ? "" : "opacity-40 grayscale"}`}>
            <span className="text-3xl">{b.emoji}</span>
            <span className="text-center text-xs font-bold">{b.name}</span>
          </div>
        ))}
      </div>

      <h2 className="mt-6 font-display text-lg font-semibold">Recommended to review</h2>
      <div className="mt-3 space-y-2">
        <Link to="/lesson" className="btn-bounce card-play flex items-center gap-3 p-4"><span className="text-2xl">🍕</span><div><p className="font-display font-semibold">Fractions</p><p className="text-xs text-muted-foreground">Math · Grade 4</p></div></Link>
        <div className="card-play flex items-center gap-3 p-4"><span className="text-2xl">✏️</span><div><p className="font-display font-semibold">Nouns & Verbs</p><p className="text-xs text-muted-foreground">English · Grade 3</p></div></div>
      </div>
    </AppShell>
  );
}
