const allowedTags = new Set([
  "a",
  "blockquote",
  "br",
  "code",
  "div",
  "em",
  "h2",
  "h3",
  "h4",
  "hr",
  "li",
  "ol",
  "p",
  "pre",
  "span",
  "strong",
  "table",
  "tbody",
  "td",
  "th",
  "thead",
  "tr",
  "u",
  "ul",
]);

const allowedAttributes = new Set(["href", "rel", "target"]);

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function sanitizeUrl(value: string) {
  const trimmed = value.trim();

  if (/^(https?:|mailto:|tel:|\/|#)/i.test(trimmed)) {
    return trimmed;
  }

  return "";
}

function sanitizeAttributes(rawAttributes: string) {
  const attributes: string[] = [];
  const matcher = /([a-zA-Z0-9:-]+)(?:\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let match: RegExpExecArray | null;

  while ((match = matcher.exec(rawAttributes))) {
    const name = match[1].toLowerCase();
    const value = match[3] ?? match[4] ?? match[5] ?? "";

    if (!allowedAttributes.has(name)) continue;
    if (name === "href") {
      const safeUrl = sanitizeUrl(value);
      if (!safeUrl) continue;
      attributes.push(`href="${escapeHtml(safeUrl)}"`);
      continue;
    }

    if (name === "target" && value === "_blank") {
      attributes.push('target="_blank"');
      attributes.push('rel="noopener noreferrer"');
    }
  }

  return attributes.length > 0 ? ` ${Array.from(new Set(attributes)).join(" ")}` : "";
}

export function sanitizeRichHtml(value: string) {
  return value
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\/?([a-zA-Z0-9-]+)([^>]*)>/g, (tag, tagName: string, attributes: string) => {
      const normalizedTag = tagName.toLowerCase();

      if (!allowedTags.has(normalizedTag)) {
        return "";
      }

      if (tag.startsWith("</")) {
        return `</${normalizedTag}>`;
      }

      const sanitizedAttributes = normalizedTag === "a" ? sanitizeAttributes(attributes) : "";
      return `<${normalizedTag}${sanitizedAttributes}>`;
    });
}

export function richContentToText(html?: string | null) {
  const value = html?.trim();

  if (!value) return "";

  return sanitizeRichHtml(value)
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/(p|li|h2|h3|h4|blockquote|tr)>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}
