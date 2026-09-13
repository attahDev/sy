// Forwards a validated "Get Involved" form submission to the SY backend
// so it shows up for admins (GET /form-submissions), instead of only
// landing in a Google Sheet nobody but the form itself could see.
// Runs server-side (inside the Next.js route handler), so there's no
// browser CORS/credentials concern here — this is a plain server-to-server
// POST, and the endpoint is public (@Public()) like registration.
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://south-yorkshire-backend.onrender.com";

export async function submitToBackend(
  formType:
    | "join-us"
    | "business-support"
    | "speaker"
    | "nominate"
    | "volunteer"
    | "cyber-training",
  payload: { name?: string | null; email?: string | null; data: Record<string, unknown> }
) {
  const res = await fetch(`${API_URL}/form-submissions/${formType}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message || `Backend rejected ${formType} submission (${res.status})`);
  }

  return res.json();
}
