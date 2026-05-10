"use client";

import { useState } from "react";
import { AuditForm, FormValues } from "@/components/audit-form";
import { AuditResults } from "@/components/audit-results";
import { LeadCaptureForm, LeadCaptureFormValues } from "@/components/lead-capture-form";
import { runAudit } from "@/lib/audit/audit";
import { AuditResult, ToolSpendInput, UseCase } from "@/types/audit";
import { submitAuditAction, submitLeadAction, sendEmailAction } from "./actions";
import { CheckCircle2 } from "lucide-react";

const MOCK_TOOLS: ToolSpendInput[] = [
  { tool: "chatgpt", plan: "team", monthlySpend: 60, seats: 2 },
  { tool: "cursor", plan: "business", monthlySpend: 40, seats: 1 }
];

export default function Home() {
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [auditId, setAuditId] = useState<string | null>(null);
  const [isLeadSubmitted, setIsLeadSubmitted] = useState(false);

  const handleAuditSubmit = async (values: FormValues) => {
    try {
      // 1. Run local audit logic to calculate savings immediately
      const result = runAudit({
        teamSize: values.teamSize,
        primaryUseCase: values.primaryUseCase as UseCase,
        tools: MOCK_TOOLS,
      });
      
      // 2. Persist audit to DB
      const savedAudit = await submitAuditAction({
        teamSize: values.teamSize,
        primaryUseCase: values.primaryUseCase,
        totalMonthlySavings: result.totalMonthlySavings,
        totalAnnualSavings: result.totalAnnualSavings,
      });

      setAuditId(savedAudit.id);
      setAuditResult(result);
      setIsLeadSubmitted(false); // Reset lead submission state for new audits
    } catch (error) {
      console.error("Failed to generate and save audit:", error);
      alert("Something went wrong while generating your audit. Please try again.");
    }
  };

  const handleLeadCaptureSubmit = async (values: LeadCaptureFormValues) => {
    if (!auditId || !auditResult) return;

    try {
      // 1. Save lead to DB, connecting it to the audit ID
      await submitLeadAction({
        email: values.email,
        companyName: values.companyName,
        auditId: auditId,
      });

      // 2. Format a quick summary text
      const summaryText = auditResult.recommendations.length > 0 
        ? `We found ${auditResult.recommendations.length} optimization opportunities for your stack. Upgrading or consolidating these could save you up to $${auditResult.totalAnnualSavings.toLocaleString()} annually.`
        : "Your current stack is perfectly optimized! Keep up the great work.";

      // 3. Send confirmation email
      await sendEmailAction({
        toEmail: values.email,
        monthlySavings: auditResult.totalMonthlySavings,
        annualSavings: auditResult.totalAnnualSavings,
        summary: summaryText,
      });

      setIsLeadSubmitted(true);
    } catch (error) {
      console.error("Failed to process lead or send email:", error);
      alert("Something went wrong. Please check your details and try again.");
    }
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
          <div className="w-full pt-12 border-t border-slate-200 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-8">
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

            {/* Lead Capture Section */}
            <div className="px-2 sm:px-0 pt-4">
              {isLeadSubmitted ? (
                <div className="w-full max-w-md mx-auto p-8 rounded-xl bg-emerald-50 border border-emerald-100 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <h3 className="text-lg font-semibold text-emerald-900">
                    Report Sent!
                  </h3>
                  <p className="text-sm text-emerald-700 font-medium">
                    Your savings report has been successfully delivered to your inbox.
                  </p>
                </div>
              ) : (
                <LeadCaptureForm onSubmit={handleLeadCaptureSubmit} />
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
