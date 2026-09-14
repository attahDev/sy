import { api } from "./api";

export type Tribute = {
  id: string;
  message: string;
  createdAt: string;
  user: { id: string; firstname: string; lastname: string };
};

export async function fetchTributes(): Promise<Tribute[]> {
  const { data } = await api.get("/tributes");
  return data?.data ?? data ?? [];
}

export async function postTribute(message: string): Promise<Tribute> {
  const { data } = await api.post("/tributes", { message });
  return data?.data ?? data;
}

export async function deleteOwnTribute(id: string): Promise<void> {
  await api.delete(`/tributes/${id}`);
}

export async function deleteTributeAsAdmin(id: string): Promise<void> {
  await api.delete(`/tributes/${id}/admin`);
}
