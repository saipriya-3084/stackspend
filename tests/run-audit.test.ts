import { describe, expect, it } from "vitest";

import { runAudit } from "@/lib/audit/run-audit";

describe("runAudit", () => {
    it("recommends ChatGPT Plus downgrade", () => {
        const result = runAudit({
            teamSize: 2,
            primaryUseCase: "coding",
            tools: [
                {
                    tool: "chatgpt",
                    plan: "team",
                    monthlySpend: 60,
                    seats: 2,
                },
            ],
        });

        expect(result.totalMonthlySavings).toBe(20);

        expect(result.recommendations.length).toBe(1);
    });
});