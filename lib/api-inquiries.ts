type InquiryPayload = {
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  project_location: string | null;
  project_size: string | null;
  preferred_date: string | null;
  message: string;
};

type InquiryResponse = {
  data: {
    id: string;
    status: string;
  };
  message?: string;
};

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL || "/backend").replace(/\/$/, "");
const apiTimeoutMs = 12000;

function nullable(value: FormDataEntryValue | null) {
  const text = typeof value === "string" ? value.trim() : "";
  return text ? text : null;
}

export function buildInquiryPayload(formData: FormData, contextLabel: string | null): InquiryPayload {
  const requestType = nullable(formData.get("requestType"));
  const timeline = nullable(formData.get("timeline"));
  const message = nullable(formData.get("message")) || "";
  const files = formData
    .getAll("attachments")
    .filter((entry): entry is File => entry instanceof File && Boolean(entry.name))
    .map((file) => file.name);

  const messageLines = [
    contextLabel ? `Selected request: ${contextLabel}` : null,
    requestType ? `Request type: ${requestType}` : null,
    timeline ? `Preferred timing: ${timeline}` : null,
    message,
    files.length ? `Attached file names: ${files.join(", ")}` : null
  ].filter(Boolean);

  return {
    name: nullable(formData.get("name")) || "",
    email: nullable(formData.get("email")),
    phone: nullable(formData.get("phone")),
    company: nullable(formData.get("company")),
    project_location: nullable(formData.get("location")),
    project_size: nullable(formData.get("quantity")),
    preferred_date: null,
    message: messageLines.join("\n\n")
  };
}

export async function submitInquiry(payload: InquiryPayload): Promise<InquiryResponse> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), apiTimeoutMs);

  const response = await fetch(`${apiBaseUrl}/inquiries`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
    signal: controller.signal
  }).finally(() => window.clearTimeout(timeout));

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = body?.message || Object.values(body?.errors || {}).flat().at(0) || "KMD could not receive this request.";
    throw new Error(String(message));
  }

  return response.json() as Promise<InquiryResponse>;
}
