import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Star, Play, Sparkles, Calculator, BookOpen, FlaskConical, Languages, Globe, Award } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { subjects, badges } from "@/lib/data";
import mascot from "@/assets/mascot.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Study Buddy — Learn & Play!" },
      { name: "description", content: "A playful learning companion for elementary students: quizzes, lessons, and rewards in Math, English, Science, Filipino, and more." },
      { property: "og:title", content: "Study Buddy — Learn & Play!" },
      { property: "og:description", content: "A playful learning companion for elementary students." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HomePage,
});

const iconMap = { calculator: Calculator, "book-open": BookOpen, "flask-conical": FlaskConical, languages: Languages, globe: Globe };
const colorMap = {
  primary: "bg-primary text-primary-foreground",
  sunny: "bg-sunny text-sunny-foreground",
  fresh: "bg-fresh text-fresh-foreground",
  sky: "bg-sky text-sky-foreground",
  coral: "bg-coral text-coral-foreground",
};

function HomePage() {
  return (
    <AppShell>
      {/* Greeting */}
      <section className="card-play flex items-center gap-4 bg-primary p-5 text-primary-foreground" style={{ borderColor: "transparent" }}>
        <img src={mascot} alt="Hootie waving hello" width={1024} height={1024} className="h-24 w-24 animate-wiggle" />
        <div>
          <h1 className="font-display text-2xl font-semibold">Hi, Juan! 👋</h1>
          <p className="mt-1 text-sm opacity-90">Ready for today's adventure? Hootie is excited to learn with you!</p>
        </div>
      </section>

      {/* Streak + goal */}
      <section className="mt-4 grid grid-cols-2 gap-3">
        <div className="card-play flex items-center gap-3 p-4">
          <div className="rounded-2xl bg-coral/30 p-2.5"><Flame className="h-6 w-6 text-coral-foreground" /></div>
          <div>
            <p className="font-display text-xl font-semibold">3 days</p>
            <p className="text-xs font-bold text-muted-foreground">Learning streak</p>
          </div>
        </div>
        <div className="card-play flex items-center gap-3 p-4">
          <div className="rounded-2xl bg-sunny/50 p-2.5"><Star className="h-6 w-6 text-sunny-foreground" /></div>
          <div>
            <p className="font-display text-xl font-semibold">48 ⭐</p>
            <p className="text-xs font-bold text-muted-foreground">Stars earned</p>
          </div>
        </div>
      </section>

      {/* Continue learning */}
      <Link to="/lesson" className="btn-bounce mt-4 flex items-center justify-between rounded-3xl bg-fresh p-5 text-fresh-foreground shadow-[0_4px_0_var(--color-border)]">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide opacity-80">Continue learning</p>
          <p className="font-display text-xl font-semibold">Math · Fractions — Lesson 1</p>
        </div>
        <div className="rounded-full bg-card p-3"><Play className="h-6 w-6 text-fresh-foreground" /></div>
      </Link>

      {/* Daily challenge */}
      <Link to="/quiz" className="btn-bounce mt-3 flex items-center gap-3 rounded-3xl border-2 border-dashed border-primary bg-secondary p-4">
        <Sparkles className="h-7 w-7 text-primary" />
        <div>
          <p className="font-display font-semibold text-secondary-foreground">Daily Challenge</p>
          <p className="text-sm text-muted-foreground">Answer 5 fraction questions and win bonus stars!</p>
        </div>
      </Link>

      {/* Subjects */}
      <h2 className="mt-7 font-display text-xl font-semibold">Pick a subject</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {subjects.map((s) => {
          const Icon = iconMap[s.icon as keyof typeof iconMap];
          return (
            <Link key={s.id} to="/subjects" className={`btn-bounce card-play flex flex-col items-center gap-2 p-4 ${colorMap[s.color]}`} style={{ borderColor: "transparent" }}>
              <Icon className="h-9 w-9" />
              <span className="font-display text-sm font-semibold text-center leading-tight">{s.name}</span>
            </Link>
          );
        })}
        <Link to="/buddy" className="btn-bounce card-play flex flex-col items-center justify-center gap-2 border-dashed p-4 text-muted-foreground">
          <span className="text-2xl">💬</span>
          <span className="font-display text-sm font-semibold text-center">Ask Hootie</span>
        </Link>
      </div>

      {/* Badges */}
      <h2 className="mt-7 font-display text-xl font-semibold">Your badges</h2>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
        {badges.filter(b => b.earned).map((b) => (
          <div key={b.id} className="card-play flex min-w-24 flex-col items-center gap-1 p-3">
            <span className="text-3xl">{b.emoji}</span>
            <span className="text-center text-xs font-bold">{b.name}</span>
          </div>
        ))}
        <div className="card-play flex min-w-24 flex-col items-center justify-center gap-1 border-dashed p-3 text-muted-foreground">
          <Award className="h-7 w-7" />
          <span className="text-center text-xs font-bold">3 more to unlock!</span>
        </div>
      </div>
    </AppShell>
  );
}
