// Admin create/edit for SOUTH-YORKSHIRE-BACKEND's /climate/admin/projects
// routes (the green projects members can support from the Climate tab).
// Separate from lib/greenImpactApi.ts, which is the member-facing side
// (stats/leaderboard/climate-insights) still on the old GMBTE contract.
import { api } from "./api";

export type AdminGreenProject = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  goalAmountMinor: number;
  raisedAmountMinor: number;
  isActive: boolean;
};

export type GreenProjectInput = {
  title: string;
  description: string;
  imageUrl?: string;
  goalAmountMinor: number;
};

export async function fetchAdminGreenProjects(): Promise<AdminGreenProject[]> {
  const { data } = await api.get("/climate/admin/projects");
  return data?.data ?? data ?? [];
}

export async function createGreenProject(input: GreenProjectInput): Promise<AdminGreenProject> {
  const { data } = await api.post("/climate/admin/projects", input);
  return data?.data ?? data;
}

export async function updateGreenProject(
  id: string,
  input: Partial<GreenProjectInput> & { isActive?: boolean },
): Promise<AdminGreenProject> {
  const { data } = await api.patch(`/climate/admin/projects/${id}`, input);
  return data?.data ?? data;
}
