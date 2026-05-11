import { AuditInput, AuditResult } from "@/types/audit";

export function runAudit(
    input: AuditInput
): AuditResult {
    const recommendations: AuditResult["recommendations"] = [];
    for (const tool of input.tools) {
        if (
            tool.tool === "chatgpt" &&
            tool.plan === "team" &&
            tool.seats <= 2
        ) {
            recommendations.push({
                tool: "chatgpt",
                currentPlan: "team",
                recommendation: "Switch to ChatGPT Plus",
                rationale:
                    "Small teams often do not need shared workspace administration features.",
                monthlySavings: 20,
            });
        }

        if (
            tool.tool === "cursor" &&
            tool.plan === "business" &&
            tool.seats === 1
        ) {
            recommendations.push({
                tool: "cursor",
                currentPlan: "business",
                recommendation: "Downgrade to Cursor Pro",
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
        totalAnnualSavings:
            totalMonthlySavings * 12,
        recommendations,
    };
}