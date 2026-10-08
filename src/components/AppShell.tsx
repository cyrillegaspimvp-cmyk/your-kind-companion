import { Link, useRouterState } from "@tanstack/react-router";
import { Home, LayoutGrid, MessageCircleHeart, Trophy } from "lucide-react";
import type { ReactNode } from "react";
import mascot from "@/assets/mascot.png";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/subjects", label: "Subjects", icon: LayoutGrid },
  { to: "/buddy", label: "Buddy", icon: MessageCircleHeart },
  { to: "/progress", label: "Progress", icon: Trophy },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b-2 border-border bg-background/95 px-4 py-3 backdrop-blur">
        <Link to="/" className="flex items-center gap-2">
          <img src={mascot} alt="Hootie the owl" width={1024} height={1024} loading="lazy" className="h-10 w-10 animate-float-soft" />
          <span className="font-display text-xl font-semibold text-primary">Study Buddy</span>
        </Link>
      </header>

      <main className="flex-1 px-4 pb-24 pt-5">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-10 border-t-2 border-border bg-card">
        <div className="mx-auto flex max-w-3xl items-center justify-around px-2 py-2">
          {navItems.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`btn-bounce flex flex-col items-center gap-0.5 rounded-2xl px-4 py-1.5 text-xs font-bold ${
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
