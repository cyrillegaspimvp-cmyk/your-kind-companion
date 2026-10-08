import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Calculator, BookOpen, FlaskConical, Languages, Globe, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { subjects } from "@/lib/data";

export const Route = createFileRoute("/subjects")({
  head: () => ({
    meta: [
      { title: "Subjects — Study Buddy" },
      { name: "description", content: "Choose a subject and topic to study: Math, English, Science, Filipino, and Araling Panlipunan." },
      { property: "og:title", content: "Subjects — Study Buddy" },
      { property: "og:description", content: "Choose a subject and topic to study." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SubjectsPage,
});

const iconMap = { calculator: Calculator, "book-open": BookOpen, "flask-conical": FlaskConical, languages: Languages, globe: Globe };
const chipMap = {
  primary: "bg-primary/15 text-primary",
  sunny: "bg-sunny/40 text-sunny-foreground",
  fresh: "bg-fresh/30 text-fresh-foreground",
  sky: "bg-sky/30 text-sky-foreground",
  coral: "bg-coral/25 text-coral-foreground",
};
const barMap = { primary: "bg-primary", sunny: "bg-sunny", fresh: "bg-fresh", sky: "bg-sky", coral: "bg-coral" };
const diffColor = { Easy: "bg-fresh/30 text-fresh-foreground", Medium: "bg-sunny/40 text-sunny-foreground", Hard: "bg-coral/25 text-coral-foreground" };

function SubjectsPage() {
  const [grade, setGrade] = useState<number | null>(null);

  return (
    <AppShell>
      <h1 className="font-display text-2xl font-semibold">What do you want to learn? 📚</h1>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        <button onClick={() => setGrade(null)} className={`btn-bounce rounded-full px-4 py-1.5 text-sm font-bold ${grade === null ? "bg-primary text-primary-foreground" : "bg-card border-2 border-border"}`}>All grades</button>
        {[1, 2, 3, 4, 5, 6].map((g) => (
          <button key={g} onClick={() => setGrade(g)} className={`btn-bounce rounded-full px-4 py-1.5 text-sm font-bold ${grade === g ? "bg-primary text-primary-foreground" : "bg-card border-2 border-border"}`}>Grade {g}</button>
        ))}
      </div>

      <div className="mt-5 space-y-6">
        {subjects.map((s) => {
          const Icon = iconMap[s.icon as keyof typeof iconMap];
          const topics = s.topics.filter((t) => grade === null || t.grade === grade);
          if (topics.length === 0) return null;
          return (
            <section key={s.id}>
              <div className="flex items-center gap-2">
                <span className={`rounded-xl p-2 ${chipMap[s.color]}`}><Icon className="h-5 w-5" /></span>
                <h2 className="font-display text-lg font-semibold">{s.name}</h2>
              </div>
              <div className="mt-3 space-y-2">
                {topics.map((t) => {
                  const isFractions = s.id === "math" && t.id === "fractions";
                  const inner = (
                    <>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-display font-semibold">{t.title}</p>
                          <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${diffColor[t.difficulty]}`}>{t.difficulty}</span>
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-bold text-muted-foreground">Grade {t.grade}</span>
                        </div>
                        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
                          <div className={`h-full rounded-full ${barMap[s.color]}`} style={{ width: `${t.completion}%` }} />
                        </div>
                        <p className="mt-1 text-xs font-bold text-muted-foreground">{t.completion === 100 ? "Completed! 🎉" : t.completion > 0 ? `${t.completion}% done` : "Not started yet"}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
                    </>
                  );
                  return isFractions ? (
                    <Link key={t.id} to="/lesson" className="btn-bounce card-play flex items-center gap-3 p-4">{inner}</Link>
                  ) : (
                    <div key={t.id} className="card-play flex items-center gap-3 p-4 opacity-80">{inner}</div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </AppShell>
  );
}
