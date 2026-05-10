"use client";

import { useState } from "react";
import { AuditForm, FormValues } from "@/components/audit-form";
import { AuditResults } from "@/components/audit-results";
import { runAudit } from "@/lib/audit/audit";
import { AuditResult, ToolSpendInput, UseCase } from "@/types/audit";

const MOCK_TOOLS: ToolSpendInput[] = [
  { tool: "chatgpt", plan: "team", monthlySpend: 60, seats: 2 },
  { tool: "cursor", plan: "business", monthlySpend: 40, seats: 1 }
];

export default function Home() {
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);

  const handleAuditSubmit = (values: FormValues) => {
    // For the MVP, we merge the user form inputs with our mock tool stack
    // to simulate a completed data pipeline.
    const result = runAudit({
      teamSize: values.teamSize,
      primaryUseCase: values.primaryUseCase as UseCase,
      tools: MOCK_TOOLS,
    });
    
    setAuditResult(result);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-start bg-zinc-50 dark:bg-black p-6 py-16 font-sans">
      <main className="w-full max-w-4xl flex flex-col items-center justify-center space-y-16">
        
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            StackSpend
          </h1>
          <p className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium">
            Audit your AI tooling spend in minutes.
          </p>
        </div>
        
        {/* Form Example */}
        <div className="w-full">
          <AuditForm onSubmit={handleAuditSubmit} />
        </div>

        {/* Results Example */}
        {auditResult && (
          <div className="w-full pt-16 border-t border-zinc-200/60 dark:border-zinc-800 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Audit Results
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
                Review your customized optimization strategy below to see exactly how much you can save on your AI tooling.
              </p>
            </div>
            
            <AuditResults 
              totalMonthlySavings={auditResult.totalMonthlySavings} 
              totalAnnualSavings={auditResult.totalAnnualSavings} 
              recommendations={auditResult.recommendations} 
            />
          </div>
        )}

      </main>
    </div>
  );
}
