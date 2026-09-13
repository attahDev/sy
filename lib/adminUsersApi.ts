// Admin user management for SOUTH-YORKSHIRE-BACKEND's /admin/users routes.
import { api } from "./api";

export type AdminUser = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "MEMBER" | "ADMIN";
  isActive: boolean;
  createdAt: string;
};

export async function fetchAdminUsers(): Promise<AdminUser[]> {
  const { data } = await api.get("/admin/users");
  return data?.data ?? data ?? [];
}

export async function setUserActive(id: string, isActive: boolean): Promise<AdminUser> {
  const { data } = await api.patch(`/admin/users/${id}/active`, { isActive });
  return data?.data ?? data;
}

export async function setUserRole(id: string, role: "MEMBER" | "ADMIN"): Promise<AdminUser> {
  const { data } = await api.patch(`/admin/users/${id}/role`, { role });
  return data?.data ?? data;
}
