import { AuditInput, AuditResult } from "@/types/audit";

export function runAudit(input: AuditInput): AuditResult {
  const recommendations: AuditResult["recommendations"] = [];

  for (const tool of input.tools) {
    if (
      tool.tool === "chatgpt" &&
      tool.plan === "team" &&
      tool.seats <= 2
    ) {
      recommendations.push({
        tool: tool.tool,
        currentPlan: tool.plan,
        title: "Switch to ChatGPT Plus",
        rationale: "Small teams don't need team features",
        monthlySavings: 20,
      });
    }

    if (
      tool.tool === "cursor" &&
      tool.plan === "business" &&
      tool.seats === 1
    ) {
      recommendations.push({
        tool: tool.tool,
        currentPlan: tool.plan,
        title: "Downgrade to Cursor Pro",
        rationale:
          "Business admin controls are likely unnecessary for solo developers.",
        monthlySavings: 20,
      });
    }
  }

  const totalMonthlySavings = recommendations.reduce(
    (sum, rec) => sum + rec.monthlySavings,
    0
  );

  return {
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    recommendations,
  };
}