// Ported as-is from GMBT-Updated-Frontend's src/lib/academySchools.ts.
export const ACADEMY_SCHOOLS = [
  { value: "microsoft", label: "Microsoft" },
  { value: "aws", label: "AWS" },
  { value: "gcp", label: "Google Cloud" },
  { value: "nvidia", label: "NVIDIA AI" },
  { value: "salesforce", label: "Salesforce" },
  { value: "data-science", label: "Data Science" },
  { value: "research", label: "Research" },
  { value: "startup", label: "Startup School" },
  { value: "investor", label: "Investor School" },
  { value: "business", label: "Business School" },
] as const;

export function schoolLabel(value: string | null | undefined): string {
  return ACADEMY_SCHOOLS.find((s) => s.value === value)?.label ?? value ?? "";
}
