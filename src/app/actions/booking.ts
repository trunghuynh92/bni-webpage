"use server";

export interface BookingState {
  status: "idle" | "ok" | "error";
}

export async function submitBooking(
  _prev: BookingState,
  formData: FormData
): Promise<BookingState> {
  // Honeypot: real users never fill this hidden field
  if ((formData.get("website") as string)?.trim()) return { status: "ok" };

  const field = (k: string) => ((formData.get(k) as string) ?? "").trim();
  const booking = {
    fullName: field("fullName"),
    phone: field("phone"),
    email: field("email"),
    company: field("company"),
    industry: field("industry"),
    note: field("note"),
    locale: field("locale"),
  };

  if (!booking.fullName || !booking.phone) return { status: "error" };

  const url = process.env.CONTENT_API_URL;
  const token = process.env.CONTENT_API_TOKEN ?? "";
  if (!url) {
    console.error("Booking received but CONTENT_API_URL is not configured:", booking);
    return { status: "error" };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      // text/plain avoids the CORS preflight Apps Script can't answer
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action: "booking", token, booking }),
      redirect: "follow",
    });
    if (!res.ok) return { status: "error" };
    const data = (await res.json()) as { ok?: boolean };
    return data.ok ? { status: "ok" } : { status: "error" };
  } catch (e) {
    console.error("Booking submit failed:", e);
    return { status: "error" };
  }
}
