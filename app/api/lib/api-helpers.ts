import { NextResponse } from "next/server";

export function jsonError(message: string, status = 400) {
  return NextResponse.json(
    { success: false, message },
    { status }
  );
}

export function jsonSuccess(message: string, data?: unknown, status = 200) {
  return NextResponse.json(
    { success: true, message, data },
    { status }
  );
}

export function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function asOptionalString(value: unknown) {
  const v = typeof value === "string" ? value.trim() : "";
  return v === "" ? null : v;
}

export function asStringArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidHttpUrl(url: string | null) {
  if (!url) return true;
  return /^https?:\/\/.+/i.test(url);
}