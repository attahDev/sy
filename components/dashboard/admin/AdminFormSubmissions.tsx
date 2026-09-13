"use client";

import { useEffect, useMemo, useState } from "react";
import { Archive, CheckCircle2, Inbox, Mail } from "lucide-react";
import {
  FORM_TYPES,
  fetchFormSubmissions,
  updateSubmissionStatus,
  type FormSubmission,
  type SubmissionStatus,
} from "@/lib/adminFormSubmissionsApi";

const typeLabels: Record<string, string> = {
  "join-us": "Join Us",
  "business-support": "Business Support",
  speaker: "Speaker",
  nominate: "Nominate",
  volunteer: "Volunteer",
  "cyber-training": "Cyber Training",
};

const statusStyles: Record<SubmissionStatus, string> = {
  new: "bg-amber-50 text-amber-800",
  reviewed: "bg-emerald-50 text-emerald-700",
  archived: "bg-[#001F3F]/5 text-[#6B7280]",
};

export default function AdminFormSubmissions() {
  const [submissions, setSubmissions] = useState<FormSubmission[] | null>(null);
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const load = () => {
    fetchFormSubmissions({
      type: typeFilter || undefined,
      status: statusFilter || undefined,
    }).then(setSubmissions);
  };

  useEffect(load, [typeFilter, statusFilter]);

  const newCount = useMemo(
    () => (submissions ?? []).filter((s) => s.status === "new").length,
    [submissions],
  );

  const setStatus = async (id: string, status: SubmissionStatus) => {
    await updateSubmissionStatus(id, status);
    load();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1B3E]">Form submissions</h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Join Us, Business Support, Speaker, Nominate, Volunteer, and Cyber Training —
            {" "}
            {newCount > 0 ? `${newCount} new` : "all caught up"}.
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-full border border-[#001F3F]/15 bg-white px-3 py-1.5 text-sm text-[#0D1B3E]"
        >
          <option value="">All form types</option>
          {FORM_TYPES.map((t) => (
            <option key={t} value={t}>
              {typeLabels[t]}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-full border border-[#001F3F]/15 bg-white px-3 py-1.5 text-sm text-[#0D1B3E]"
        >
          <option value="">All statuses</option>
          <option value="new">New</option>
          <option value="reviewed">Reviewed</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div className="mt-5 space-y-2">
        {submissions === null && <p className="text-sm text-[#6B7280]">Loading…</p>}
        {submissions?.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#001F3F]/15 p-8 text-center text-sm text-[#6B7280]">
            <Inbox className="mx-auto mb-2 h-6 w-6 text-[#001F3F]/30" />
            No submissions match this filter.
          </div>
        )}
        {submissions?.map((s) => {
          const isOpen = openId === s.id;
          return (
            <div key={s.id} className="rounded-2xl border border-[#001F3F]/10 bg-white p-4">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : s.id)}
                className="flex w-full flex-wrap items-center justify-between gap-2 text-left"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#001F3F]/5 px-2 py-0.5 text-[11px] font-semibold text-[#001F3F]">
                      {typeLabels[s.type] ?? s.type}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusStyles[s.status] ?? statusStyles.new}`}>
                      {s.status}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm font-semibold text-[#001F3F]">
                    {s.name || "No name given"}
                  </p>
                  {s.email && (
                    <p className="flex items-center gap-1 text-xs text-[#6B7280]">
                      <Mail className="h-3 w-3" /> {s.email}
                    </p>
                  )}
                </div>
                <span className="text-xs text-[#6B7280]">
                  {new Date(s.createdAt).toLocaleDateString()}
                </span>
              </button>

              {isOpen && (
                <div className="mt-3 space-y-3 border-t border-[#001F3F]/10 pt-3">
                  <dl className="grid gap-1.5 text-sm sm:grid-cols-2">
                    {Object.entries(s.data ?? {}).map(([key, value]) => (
                      <div key={key}>
                        <dt className="text-[11px] font-semibold uppercase tracking-wide text-[#6B7280]">
                          {key}
                        </dt>
                        <dd className="break-words text-[#0D1B3E]">{String(value)}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="flex gap-2">
                    {s.status !== "reviewed" && (
                      <button
                        onClick={() => setStatus(s.id, "reviewed")}
                        className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" /> Mark reviewed
                      </button>
                    )}
                    {s.status !== "archived" && (
                      <button
                        onClick={() => setStatus(s.id, "archived")}
                        className="flex items-center gap-1 rounded-full bg-[#001F3F]/5 px-3 py-1.5 text-xs font-semibold text-[#001F3F]"
                      >
                        <Archive className="h-3.5 w-3.5" /> Archive
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
