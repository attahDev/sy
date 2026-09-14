import { api } from "./api";
import type { Borough, Honoree, Region } from "./honoreesApi";

export type HonoreeInput = {
  name: string;
  role: string;
  location: string;
  imageUrl?: string;
  region?: Region;
  borough?: Borough;
  category: string;
  sector: string;
  tags?: string[];
};

export async function fetchAdminHonorees(): Promise<Honoree[]> {
  const { data } = await api.get("/honorees/admin/all");
  return data?.data ?? data ?? [];
}

export async function createHonoree(input: HonoreeInput): Promise<Honoree> {
  const { data } = await api.post("/honorees", input);
  return data?.data ?? data;
}

export async function updateHonoree(
  id: string,
  input: Partial<HonoreeInput> & { isActive?: boolean },
): Promise<Honoree> {
  const { data } = await api.patch(`/honorees/${id}`, input);
  return data?.data ?? data;
}

export async function deleteHonoree(id: string): Promise<void> {
  await api.delete(`/honorees/${id}`);
}

export async function uploadHonoreeImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const { data } = await api.post("/uploads/honoree-image", form);
  const body = data?.data ?? data;
  return body.url;
}
