// Award Recognition — public directory. Admin CRUD lives in
// lib/adminHonoreesApi.ts (mirrors the academy/adminAcademyApi split).
import { api } from "./api";

export const REGIONS = ["uk", "africa", "america-caribbean", "global"] as const;
export type Region = (typeof REGIONS)[number];

export const BOROUGHS = ["Sheffield", "Barnsley", "Doncaster", "Rotherham"] as const;
export type Borough = (typeof BOROUGHS)[number];

export type Honoree = {
  id: string;
  name: string;
  role: string;
  location: string;
  imageUrl: string | null;
  region: Region | null;
  borough: Borough | null;
  category: string;
  sector: string;
  tags: string[];
  isActive: boolean;
};

export type HonoreeCounts = {
  region: Record<Region, number>;
  borough: Record<Borough, number>;
};

export async function fetchHonorees(filters?: { region?: string; borough?: string }): Promise<Honoree[]> {
  const { data } = await api.get("/honorees", { params: filters });
  return data?.data ?? data ?? [];
}

export async function fetchHonoreeCounts(): Promise<HonoreeCounts> {
  const { data } = await api.get("/honorees/counts");
  return data?.data ?? data;
}
