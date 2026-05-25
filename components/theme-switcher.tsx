"use client";

import { useEffect, useState } from "react";

const themes = [
  { id: "kmd", label: "KMD Logo", color: "linear-gradient(135deg, #061b73 0 55%, #ed1c24 55% 100%)" },
  { id: "stone", label: "Stone", color: "#8a6a4a" },
  { id: "sage", label: "Sage", color: "#5f7f62" },
  { id: "sky", label: "Sky", color: "#426f92" },
  { id: "clay", label: "Clay", color: "#a15f45" }
] as const;

type ThemeId = (typeof themes)[number]["id"];

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>("kmd");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("kmd-theme") as ThemeId | null;
    if (savedTheme && themes.some((item) => item.id === savedTheme)) {
      setTheme(savedTheme);
      document.documentElement.dataset.theme = savedTheme;
    }
  }, []);

  function chooseTheme(nextTheme: ThemeId) {
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("kmd-theme", nextTheme);
    setOpen(false);
  }

  const activeTheme = themes.find((item) => item.id === theme) ?? themes[0];

  return (
    <div className="fixed bottom-5 right-5 z-50" aria-label="Theme color">
      {open ? (
        <div className="mb-3 w-48 rounded-lg border border-sand-400 bg-sand-50 p-3 shadow-card">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink-700">Theme</div>
          <div className="grid gap-2">
            {themes.map((item) => (
              <button
                key={item.id}
                className={`flex items-center gap-3 rounded-md border px-3 py-2 text-left text-sm transition ${
                  theme === item.id ? "border-bronze-500 bg-sand-100 text-ink-900" : "border-sand-400 text-ink-700 hover:bg-sand-100"
                }`}
                onClick={() => chooseTheme(item.id)}
                type="button"
              >
                <span className="h-5 w-5 rounded-full border border-sand-400" style={{ background: item.color }} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      <button
        aria-expanded={open}
        aria-label="Choose theme color"
        className="flex h-12 w-12 items-center justify-center rounded-full border border-sand-400 bg-sand-50 shadow-card transition hover:border-bronze-500"
        onClick={() => setOpen((value) => !value)}
        title="Theme"
        type="button"
      >
        <span className="block h-6 w-6 rounded-full border border-sand-400" style={{ background: activeTheme.color }} />
      </button>
    </div>
  );
}
