"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

type ServiceFaqProps = {
  items: Array<{
    question: string;
    answer: string;
  }>;
};

export function ServiceFaq({ items }: ServiceFaqProps) {
  const [openQuestion, setOpenQuestion] = useState(items[0]?.question ?? "");

  return (
    <div className="grid gap-3">
      {items.map((faq, index) => {
        const open = openQuestion === faq.question;

        return (
          <div key={faq.question} className={`overflow-hidden rounded-lg border bg-white transition ${open ? "border-[var(--brand-red)] shadow-soft" : "border-sand-400"}`}>
            <button
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
              onClick={() => setOpenQuestion(open ? "" : faq.question)}
              type="button"
            >
              <span className="flex items-start gap-4">
                <span className="mt-1 text-[10px] font-semibold tracking-[0.16em] text-brand-red">0{index + 1}</span>
                <span className="font-serif text-xl leading-snug text-ink-900">{faq.question}</span>
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand-100">
                <ChevronDown className={`h-4 w-4 text-brand-red transition ${open ? "rotate-180" : ""}`} />
              </span>
            </button>
            {open ? <p className="border-t border-sand-400 px-5 py-5 pl-14 text-sm leading-7 text-ink-700">{faq.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
