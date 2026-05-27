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
      {items.map((faq) => {
        const open = openQuestion === faq.question;

        return (
          <div key={faq.question} className="overflow-hidden rounded-lg border border-sand-400 bg-white">
            <button
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              onClick={() => setOpenQuestion(open ? "" : faq.question)}
              type="button"
            >
              <span className="font-serif text-xl text-ink-900">{faq.question}</span>
              <ChevronDown className={`h-5 w-5 shrink-0 text-brand-red transition ${open ? "rotate-180" : ""}`} />
            </button>
            {open ? <p className="border-t border-sand-400 px-5 py-4 text-sm leading-6 text-ink-700">{faq.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
