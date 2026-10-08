import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Lightbulb, RotateCcw, Check, X } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { fractionQuiz } from "@/lib/data";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Fractions Quiz — Study Buddy" },
      { name: "description", content: "Practice fractions with fun multiple-choice and true-or-false questions, hints, and instant feedback." },
      { property: "og:title", content: "Fractions Quiz — Study Buddy" },
      { property: "og:description", content: "Practice fractions with instant feedback." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: QuizPage,
});

function QuizPage() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const q = fractionQuiz[index]!;
  const correct = selected === q.answer;

  const check = () => {
    if (selected === null) return;
    setChecked(true);
    setAnswers((a) => { const n = [...a]; n[index] = selected === q.answer; return n; });
  };

  const retry = () => { setSelected(null); setChecked(false); };

  const next = () => {
    if (index === fractionQuiz.length - 1) {
      const wrong = answers.map((ok, i) => (ok ? -1 : i)).filter((i) => i >= 0);
      navigate({ to: "/results", search: { score: answers.filter(Boolean).length, total: fractionQuiz.length, wrong: wrong.join(",") } });
      return;
    }
    setIndex(index + 1); setSelected(null); setChecked(false); setShowHint(false);
  };

  return (
    <AppShell>
      <div className="flex items-center justify-between">
        <p className="font-display font-semibold text-primary">Question {index + 1} of {fractionQuiz.length}</p>
        <p className="text-sm font-bold text-muted-foreground">⭐ {answers.filter(Boolean).length}</p>
      </div>
      <div className="mt-2 h-3 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((index + (checked ? 1 : 0)) / fractionQuiz.length) * 100}%` }} />
      </div>

      <div key={index} className="card-play mt-5 animate-pop-in p-6 text-center">
        <span className="text-7xl">{q.emoji}</span>
        <h1 className="mt-4 font-display text-xl font-semibold leading-snug">{q.question}</h1>
      </div>

      <div className={`mt-4 grid gap-3 ${q.options.length === 2 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"}`}>
        {q.options.map((opt, i) => {
          let style = "bg-card border-border";
          if (checked && i === q.answer) style = "bg-fresh/30 border-fresh text-fresh-foreground";
          else if (checked && i === selected) style = "bg-coral/25 border-coral text-coral-foreground";
          else if (selected === i) style = "bg-secondary border-primary text-secondary-foreground";
          return (
            <button key={i} disabled={checked} onClick={() => setSelected(i)}
              className={`btn-bounce flex items-center justify-between rounded-2xl border-2 px-5 py-4 text-left font-display text-lg font-semibold ${style}`}>
              {opt}
              {checked && i === q.answer && <Check className="h-6 w-6" />}
              {checked && i === selected && i !== q.answer && <X className="h-6 w-6" />}
            </button>
          );
        })}
      </div>

      {showHint && !checked && (
        <div className="mt-4 animate-pop-in rounded-2xl bg-sunny/40 p-4 text-sm font-semibold text-sunny-foreground">💡 {q.hint}</div>
      )}

      {checked && (
        <div className={`mt-4 animate-pop-in rounded-2xl p-4 ${correct ? "bg-fresh/30 text-fresh-foreground" : "bg-coral/25 text-coral-foreground"}`}>
          <p className="font-display text-lg font-semibold">{correct ? "Awesome! You got it! 🎉" : "Oops! Not quite. 💪"}</p>
          <p className="mt-1 text-sm font-semibold">{q.explanation}</p>
        </div>
      )}

      <div className="mt-5 flex gap-3">
        {!checked ? (
          <>
            <button onClick={() => setShowHint(true)} className="btn-bounce flex items-center gap-1 rounded-2xl border-2 border-border bg-card px-4 py-3 font-bold">
              <Lightbulb className="h-5 w-5 text-sunny-foreground" /> Hint
            </button>
            <button onClick={check} disabled={selected === null} className="btn-bounce flex-1 rounded-2xl bg-primary py-3 font-display text-lg font-semibold text-primary-foreground shadow-[0_4px_0_var(--color-border)] disabled:opacity-40">
              Check Answer
            </button>
          </>
        ) : (
          <>
            {!correct && (
              <button onClick={retry} className="btn-bounce flex items-center gap-1 rounded-2xl border-2 border-border bg-card px-4 py-3 font-bold">
                <RotateCcw className="h-5 w-5" /> Retry
              </button>
            )}
            <button onClick={next} className="btn-bounce flex-1 rounded-2xl bg-fresh py-3 font-display text-lg font-semibold text-fresh-foreground shadow-[0_4px_0_var(--color-border)]">
              {index === fractionQuiz.length - 1 ? "See Results 🏆" : "Next Question →"}
            </button>
          </>
        )}
      </div>
    </AppShell>
  );
}
