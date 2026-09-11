"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import {
  fetchAdminUsers,
  setUserActive,
  setUserRole,
  type AdminUser,
} from "@/lib/adminUsersApi";

export default function AdminUsers() {
  const { user: me } = useAuth();
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = () => { fetchAdminUsers().then(setUsers); };
  useEffect(load, []);

  const toggleActive = async (u: AdminUser) => {
    setBusyId(u.id);
    try {
      await setUserActive(u.id, !u.isActive);
      load();
    } finally {
      setBusyId(null);
    }
  };

  const toggleRole = async (u: AdminUser) => {
    if (u.id === me?.id) return; // don't let an admin demote themselves
    setBusyId(u.id);
    try {
      await setUserRole(u.id, u.role === "ADMIN" ? "MEMBER" : "ADMIN");
      load();
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-[#0D1B3E]">Users</h1>
      <p className="mt-1 text-sm text-[#6B7280]">Manage member access and admin roles.</p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-[#0D1B3E1F] bg-white">
        <table className="w-full text-sm">
          <thead className="bg-[#F7F8FA] text-left text-xs uppercase tracking-wide text-[#8B93A1]">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {users === null && (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-[#6B7280]">Loading…</td></tr>
            )}
            {users?.map((u) => (
              <tr key={u.id} className="border-t border-[#0D1B3E0F]">
                <td className="px-4 py-3 font-medium text-[#0D1B3E]">
                  {u.firstname} {u.lastname} {u.id === me?.id && <span className="text-xs text-[#8B93A1]">(you)</span>}
                </td>
                <td className="px-4 py-3 text-[#6B7280]">{u.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      u.role === "ADMIN" ? "bg-[#0D1B3E] text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      u.isActive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {u.isActive ? "Active" : "Suspended"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => toggleRole(u)}
                    disabled={busyId === u.id || u.id === me?.id}
                    className="mr-2 rounded-full border border-[#0D1B3E1F] px-3 py-1 text-xs font-medium text-[#0D1B3E] disabled:opacity-40"
                  >
                    {u.role === "ADMIN" ? "Remove admin" : "Make admin"}
                  </button>
                  <button
                    onClick={() => toggleActive(u)}
                    disabled={busyId === u.id}
                    className="rounded-full border border-[#0D1B3E1F] px-3 py-1 text-xs font-medium text-[#0D1B3E] disabled:opacity-40"
                  >
                    {u.isActive ? "Suspend" : "Reactivate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
