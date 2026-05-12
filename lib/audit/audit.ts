import {
  AuditResult,
  Recommendation,
  ToolSpendInput,
  UseCase,
} from "@/types/audit";

interface RunAuditInput {
  teamSize: number;
  primaryUseCase: UseCase;
  tools: ToolSpendInput[];
}

export function runAudit({
  teamSize,
  primaryUseCase,
  tools,
}: RunAuditInput): AuditResult {
  const recommendations: Recommendation[] = [];

  let totalMonthlySavings = 0;

  // Team-size based recommendations
  if (teamSize >= 10) {
    recommendations.push({
      title: "Consolidate AI tooling",
      rationale:
        "Large teams often pay for overlapping AI subscriptions.",
      monthlySavings: 120,
    });

    totalMonthlySavings += 120;
  }

  // Use-case based recommendations
  if (primaryUseCase === "coding") {
    recommendations.push({
      title: "Optimize coding assistant usage",
      rationale:
        "Engineering teams frequently overpay for premium AI coding tiers.",
      monthlySavings: 40,
    });

    totalMonthlySavings += 40;
  }

  if (primaryUseCase === "research") {
    recommendations.push({
      title: "Reduce duplicate research tools",
      rationale:
        "Multiple AI research subscriptions may overlap heavily.",
      monthlySavings: 60,
    });

    totalMonthlySavings += 60;
  }

  if (primaryUseCase === "design") {
    recommendations.push({
      title: "Streamline design AI stack",
      rationale:
        "Creative tooling often includes redundant premium plans.",
      monthlySavings: 35,
    });

    totalMonthlySavings += 35;
  }

  // Tool-based recommendations
  tools.forEach((tool) => {
    if (
      tool.tool === "chatgpt" &&
      tool.plan === "team"
    ) {
      recommendations.push({
        title: "Downgrade ChatGPT Team plan",
        rationale:
          "Some users may not require enterprise-level access.",
        monthlySavings: 25,
      });

      totalMonthlySavings += 25;
    }

    if (
      tool.tool === "cursor" &&
      tool.monthlySpend > 30
    ) {
      recommendations.push({
        title: "Review Cursor seat allocation",
        rationale:
          "Inactive developer seats may still be billed.",
        monthlySavings: 15,
      });

      totalMonthlySavings += 15;
    }
  });

  // No recommendations fallback
  if (recommendations.length === 0) {
    recommendations.push({
      title: "Healthy AI stack",
      rationale:
        "Your current tooling setup already appears optimized.",
      monthlySavings: 0,
    });
  }

  return {
    totalMonthlySavings,
    totalAnnualSavings:
      totalMonthlySavings * 12,
    recommendations,
  };
}