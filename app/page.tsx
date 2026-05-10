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
    <div className="min-h-screen flex flex-col items-center justify-start bg-slate-50 p-4 sm:p-8 md:p-12 font-sans selection:bg-emerald-100">
      <main className="w-full max-w-4xl mx-auto flex flex-col items-center space-y-12 pb-16">
        
        {/* Header Section */}
        <div className="space-y-4 text-center mt-8 sm:mt-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900">
            StackSpend
          </h1>
          <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto font-medium leading-relaxed px-4">
            Audit your AI tooling spend and uncover immediate savings opportunities for your team.
          </p>
        </div>
        
        {/* Input Section */}
        <div className="w-full px-2 sm:px-0">
          <AuditForm onSubmit={handleAuditSubmit} />
        </div>

        {/* Results Section */}
        {auditResult && (
          <div className="w-full pt-12 border-t border-slate-200 space-y-8">
            <div className="text-center space-y-2 px-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Audit Results
              </h2>
              <p className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto">
                Review your customized optimization strategy below to see exactly how much you can save on your AI tooling.
              </p>
            </div>
            
            <div className="px-2 sm:px-0">
              <AuditResults 
                totalMonthlySavings={auditResult.totalMonthlySavings} 
                totalAnnualSavings={auditResult.totalAnnualSavings} 
                recommendations={auditResult.recommendations} 
              />
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
