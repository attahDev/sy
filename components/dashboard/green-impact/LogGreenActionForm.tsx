"use client";

// Adapted from GMBT-Updated-Frontend's ClimateDashboard/Component/
// RightSide/LogGreenActionForm.tsx. Two real fixes, not just a port:
// 1. AREA_OPTIONS in the original lists Greater Manchester's boroughs
//    (City Centre, Salford, Trafford, Stockport...) — wrong region
//    entirely for this site. Replaced with South Yorkshire's actual 4
//    metropolitan boroughs.
// 2. The original defines AREA_OPTIONS and an `area` state variable but
//    never actually renders a control for it — dead code, `area` was
//    always sent empty. Added the missing <select> below so the "Impact
//    by Area" chart (ClimateInsightsData) can ever have real data.
import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { logGreenAction, type GreenActionType } from "@/lib/greenImpactApi";

const TYPE_OPTIONS: { value: GreenActionType; label: string }[] = [
  { value: "RECYCLING", label: "Recycling" },
  { value: "TRANSPORT", label: "Public transport / cycling" },
  { value: "ENERGY", label: "Energy saving" },
  { value: "WASTE_REDUCTION", label: "Waste reduction" },
  { value: "TREE_PLANTING", label: "Tree planting" },
  { value: "OTHER", label: "Other" },
];

// South Yorkshire's 4 metropolitan boroughs — optional tag powering the
// "Impact by Area" chart in ClimateInsightsData. Left blank, the action
// just doesn't count toward any borough's total.
const AREA_OPTIONS = ["Sheffield", "Barnsley", "Doncaster", "Rotherham"];

export default function LogGreenActionForm({ onLogged }: { onLogged: () => void }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<GreenActionType>("RECYCLING");
  const [co2, setCo2] = useState("");
  const [description, setDescription] = useState("");
  const [area, setArea] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    const co2OffsetKg = parseFloat(co2);
    if (!co2OffsetKg || co2OffsetKg <= 0) {
      setError("Enter how many kg of CO2 this offset.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await logGreenAction({ type, co2OffsetKg, description: description || undefined, area: area || undefined });
      setCo2(""); setDescription(""); setArea(""); setOpen(false);
      onLogged();
    } catch {
      setError("Couldn't log that action — try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="flex w-full items-center justify-center gap-2 rounded-[12px] border-2 border-dashed border-[#D8DCE2] py-3 text-[14px] font-semibold text-[#4E5D6C] transition hover:border-[#2D7A45] hover:text-[#2D7A45]">
        <Plus size={16} /> Log a green action
      </button>
    );
  }

  return (
    <div className="rounded-[12px] border border-[#E2E5E9] bg-[#F9FAFB] p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <select value={type} onChange={(e) => setType(e.target.value as GreenActionType)} className="rounded-[8px] border border-[#D8DCE2] bg-white px-3 py-2 text-[14px] text-[#0D1B3E]">
          {TYPE_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        <input type="number" min="0.01" step="0.1" placeholder="CO2 Impact (kg)" value={co2} onChange={(e) => setCo2(e.target.value)} className="rounded-[8px] border border-[#D8DCE2] bg-white px-3 py-2 text-[14px] text-[#0D1B3E]" />
      </div>
      <select value={area} onChange={(e) => setArea(e.target.value)} className="mt-3 w-full rounded-[8px] border border-[#D8DCE2] bg-white px-3 py-2 text-[14px] text-[#0D1B3E]">
        <option value="">Area (optional)</option>
        {AREA_OPTIONS.map((a) => <option key={a} value={a}>{a}</option>)}
      </select>
      <input type="text" placeholder="Short description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-3 w-full rounded-[8px] border border-[#D8DCE2] bg-white px-3 py-2 text-[14px] text-[#0D1B3E]" />
      {error && <p className="mt-2 text-[13px] text-[#D7263D]">{error}</p>}
      <div className="mt-3 flex gap-2">
        <button onClick={submit} disabled={submitting} className="flex items-center gap-2 rounded-[8px] bg-[#2D7A45] px-4 py-2 text-[14px] font-semibold text-white disabled:opacity-60">
          {submitting ? <Loader2 size={14} className="animate-spin" /> : null} Log it
        </button>
        <button onClick={() => setOpen(false)} className="rounded-[8px] border border-[#D8DCE2] px-4 py-2 text-[14px] font-medium text-[#4E5D6C]">Cancel</button>
      </div>
    </div>
  );
}
