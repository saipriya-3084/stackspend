"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { AuditForm, FormValues } from "@/components/audit-form";
import { AuditResults } from "@/components/audit-results";
import {
  LeadCaptureForm,
  LeadCaptureFormValues,
} from "@/components/lead-capture-form";

import { runAudit } from "@/lib/audit/audit";

import {
  AuditResult,
  ToolSpendInput,
  UseCase,
} from "@/types/audit";

import {
  submitAuditAction,
  submitLeadAction,
  sendEmailAction,
} from "./actions";

const MOCK_TOOLS: ToolSpendInput[] = [
  {
    tool: "chatgpt",
    plan: "team",
    monthlySpend: 60,
    seats: 2,
  },
  {
    tool: "cursor",
    plan: "business",
    monthlySpend: 40,
    seats: 1,
  },
];

export default function Home() {
  const [auditResult, setAuditResult] =
    useState<AuditResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [auditId, setAuditId] =
    useState<string | null>(null);

  const [isLeadSubmitted, setIsLeadSubmitted] =
    useState(false);
  const [isRunningAudit, setIsRunningAudit] = useState(false);
const [isSendingReport, setIsSendingReport] = useState(false);
  const handleAuditSubmit = async (
    values: FormValues
  ) => {
    setErrorMessage(null);
    setIsRunningAudit(true);
    try {
      const result = runAudit({
  teamSize: values.teamSize,
  primaryUseCase:
    values.primaryUseCase as UseCase,
  tools: MOCK_TOOLS,
});

      const savedAudit = await submitAuditAction({
        teamSize: values.teamSize,
        primaryUseCase: values.primaryUseCase,
        totalMonthlySavings:
          result.totalMonthlySavings,
        totalAnnualSavings:
          result.totalAnnualSavings,
      });

      setAuditId(savedAudit.id);
      setAuditResult(result);
      setIsLeadSubmitted(false);
    } catch (error) {
      console.error(
        "Failed to generate and save audit:",
        error
      );

      setErrorMessage(
  "Something went wrong while generating your audit."
);
    }finally {
    setIsRunningAudit(false);
  }
  };

  const handleLeadCaptureSubmit = async (
    values: LeadCaptureFormValues
  ) => {
    setErrorMessage(null);
    if (!auditId || !auditResult) return;

    try {
      await submitLeadAction({
        email: values.email,
        companyName: values.companyName,
        auditId,
      });

      const summaryText =
        auditResult.recommendations.length > 0
          ? `We found ${auditResult.recommendations.length} optimization opportunities for your stack. You could save up to $${auditResult.totalAnnualSavings.toLocaleString()} annually.`
          : "Your current stack is already optimized.";

      await sendEmailAction({
        toEmail: values.email,
        monthlySavings:
          auditResult.totalMonthlySavings,
        annualSavings:
          auditResult.totalAnnualSavings,
        summary: summaryText,
      });

      setIsLeadSubmitted(true);
    } catch (error) {
      console.error(
        "Failed to process lead or send email:",
        error
      );

     setErrorMessage(
  "We couldn't send your report email right now."
);
    } finally {
    setIsSendingReport(false);
  }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 py-10 sm:px-6 lg:px-8">
        <section className="space-y-6 text-center">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1 text-sm font-medium text-slate-600 shadow-sm">
            AI SaaS Spend Optimization
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Audit Your AI Tooling Spend
            </h1>

            <p className="mx-auto max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Discover unnecessary subscriptions,
              reduce SaaS waste, and uncover
              actionable savings opportunities for
              your team in minutes.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
<AuditForm
  onSubmit={handleAuditSubmit}
/>        </section>
        {errorMessage && (
  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
    {errorMessage}
  </div>
)}
        {auditResult && (
          <section className="space-y-10">
            <div className="space-y-3 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Your Savings Report
              </h2>

              <p className="mx-auto max-w-2xl text-slate-600">
                Review personalized recommendations
                and identify where your AI tooling
                stack can be optimized.
              </p>
            </div>

            <AuditResults
              totalMonthlySavings={
                auditResult.totalMonthlySavings
              }
              totalAnnualSavings={
                auditResult.totalAnnualSavings
              }
              recommendations={
                auditResult.recommendations
              }
            />

            <div className="pt-4">
              {isLeadSubmitted ? (
                <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm">
                  <CheckCircle2 className="mb-4 h-10 w-10 text-emerald-500" />

                  <h3 className="text-xl font-semibold text-emerald-900">
                    Report Sent
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-emerald-700">
                    Your personalized savings report
                    has been delivered successfully.
                  </p>
                </div>
              ) : (
                <LeadCaptureForm
                  onSubmit={
                    handleLeadCaptureSubmit
                  }
                />
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}