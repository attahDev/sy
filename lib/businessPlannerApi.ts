// Was still calling GMBTE's old /business-planner/* contract with
// snake_case payload fields — SY backend's real routes are under
// /business-studio/business-plans/* with camelCase fields (see
// SOUTH-YORKSHIRE-BACKEND's business-studio.controller.ts and
// dto/business-plan.dto.ts). Every response is wrapped in the standard
// {success,data,message,timestamp} envelope — unwrapped here so
// callers just get the plain data, same convention as every other
// API client in this codebase.
import { api } from "./api";

export type GeneratePlanPayload = {
  business_idea: string;
  industry: string;
  target_audience: string;
  skills: string;
  budget: string;
  location: string;
  experience_level: string;
  goal: string;
  source_idea_id?: string;
};

export type BusinessPlanHistoryItem = {
  id: string;
  userId: string;
  businessIdea: string;
  industry: string;
  targetAudience: string;
  skills: string;
  budget: string;
  location: string;
  experienceLevel: string;
  goal: string;
  sourceIdeaId: string | null;
  aiResponse: any;
  completedActionIndexes: number[];
  createdAt: string;
  updatedAt: string;
};

type Envelope<T> = { success: boolean; data: T; message: string; timestamp: string };

export const generateBusinessPlan = async (payload: GeneratePlanPayload) => {
  const { data } = await api.post<Envelope<BusinessPlanHistoryItem>>("/business-studio/business-plans", {
    businessIdea: payload.business_idea,
    industry: payload.industry,
    targetAudience: payload.target_audience,
    skills: payload.skills,
    budget: payload.budget,
    location: payload.location,
    experienceLevel: payload.experience_level,
    goal: payload.goal,
    sourceIdeaId: payload.source_idea_id,
  });
  return data.data;
};

export const getBusinessPlanHistory = async (): Promise<BusinessPlanHistoryItem[]> => {
  const { data } = await api.get<Envelope<BusinessPlanHistoryItem[]>>("/business-studio/business-plans");
  return data.data;
};

export const getBusinessPlanById = async (planId: string): Promise<BusinessPlanHistoryItem> => {
  const { data } = await api.get<Envelope<BusinessPlanHistoryItem>>(`/business-studio/business-plans/${planId}`);
  return data.data;
};

export const updatePlanProgress = async (planId: string, completedActionIndexes: number[]) => {
  const { data } = await api.patch<Envelope<{ success: boolean; planId: string; completedActionIndexes: number[] }>>(
    `/business-studio/business-plans/${planId}/progress`,
    { completedActionIndexes },
  );
  return data.data;
};
