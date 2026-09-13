import BPTabsClient from "@/components/dashboard/business-plan/BPTabsClient";

export default async function BusinessPlanByIdPage({ params }: { params: Promise<{ planId: string }> }) {
  const { planId } = await params;
  return <BPTabsClient routePlanId={planId} />;
}
