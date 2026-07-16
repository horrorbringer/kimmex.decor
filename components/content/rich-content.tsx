import { sanitizeRichHtml } from "@/lib/rich-content";

function mergeClassName(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

type RichContentProps = {
  className?: string;
  html?: string | null;
  plainClassName?: string;
};

export function RichContent({ className, html, plainClassName }: RichContentProps) {
  const value = html?.trim();

  if (!value) return null;

  if (!/<[a-z][\s\S]*>/i.test(value)) {
    return <p className={plainClassName ?? className}>{value}</p>;
  }

  return (
    <div
      className={mergeClassName("rich-content", className)}
      dangerouslySetInnerHTML={{ __html: sanitizeRichHtml(value) }}
    />
  );
}
