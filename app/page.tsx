import { AuditForm } from "@/components/audit-form";
import { AuditResults, Recommendation } from "@/components/audit-results";

const MOCK_RECOMMENDATIONS: Recommendation[] = [
  {
    tool: "GitHub Copilot",
    currentPlan: "Enterprise",
    recommendation: "Downgrade to Business",
    rationale: "Analysis shows your team isn't utilizing the advanced IP indemnification and custom model training features exclusive to the Enterprise tier. Moving to Business provides the identical coding assistance features while significantly reducing per-seat costs.",
    monthlySavings: 380,
  },
  {
    tool: "ChatGPT",
    currentPlan: "Team (20 seats)",
    recommendation: "Consolidate unused licenses",
    rationale: "Usage logs indicate that 5 seats have been entirely inactive over the last 60 days. Removing these idle licenses will trim your monthly bill without affecting active users.",
    monthlySavings: 150,
  },
  {
    tool: "Midjourney",
    currentPlan: "Pro Plan",
    recommendation: "Switch to Standard Plan",
    rationale: "Your team's fast-hour usage rarely exceeds the 15-hour limit provided by the Standard plan. You can safely downgrade without hitting rate limits during regular operations.",
    monthlySavings: 60,
  }
];

export default function Home() {
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
          <AuditForm />
        </div>

        {/* Results Example */}
        <div className="w-full pt-16 border-t border-zinc-200/60 dark:border-zinc-800 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Audit Results
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
              Review your customized optimization strategy below to see exactly how much you can save on your AI tooling.
            </p>
          </div>
          
          <AuditResults 
            totalMonthlySavings={590} 
            totalAnnualSavings={7080} 
            recommendations={MOCK_RECOMMENDATIONS} 
          />
        </div>

      </main>
    </div>
  );
}
