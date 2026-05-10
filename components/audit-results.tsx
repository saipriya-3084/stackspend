import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export interface Recommendation {
  tool: string;
  currentPlan: string;
  recommendation: string;
  rationale: string;
  monthlySavings: number;
}

export interface AuditResultsProps {
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  recommendations: Recommendation[];
}

export function AuditResults({
  totalMonthlySavings,
  totalAnnualSavings,
  recommendations,
}: AuditResultsProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 font-sans">
      {/* Summary Section */}
      <section>
        <Card className="bg-white dark:bg-zinc-950 border-zinc-200/60 dark:border-zinc-800 shadow-sm rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 p-8">
              <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">
                Total Monthly Savings
              </h2>
              <div className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-baseline gap-1">
                <span className="text-zinc-400 dark:text-zinc-600 text-3xl sm:text-4xl">$</span>
                <span>{totalMonthlySavings.toLocaleString()}</span>
              </div>
            </div>
            <Separator orientation="vertical" className="hidden md:block h-auto border-zinc-100 dark:border-zinc-800" />
            <Separator orientation="horizontal" className="block md:hidden border-zinc-100 dark:border-zinc-800" />
            <div className="flex-1 p-8 bg-zinc-50/50 dark:bg-zinc-900/20">
              <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">
                Projected Annual Savings
              </h2>
              <div className="text-4xl sm:text-5xl font-semibold tracking-tight text-emerald-600 dark:text-emerald-500 flex items-baseline gap-1">
                <span className="text-emerald-500/60 dark:text-emerald-600/60 text-3xl sm:text-4xl">$</span>
                <span>{totalAnnualSavings.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Recommendations Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Optimization Opportunities
          </h3>
          <Badge variant="secondary" className="rounded-full font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-700">
            {recommendations.length} {recommendations.length === 1 ? "Item" : "Items"}
          </Badge>
        </div>

        {recommendations.length === 0 ? (
          <Card className="p-12 border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl flex flex-col items-center justify-center text-center">
            <h4 className="text-lg font-medium text-zinc-900 dark:text-zinc-50 mb-2">
              Your stack is optimized
            </h4>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-sm">
              We couldn&apos;t find any immediate savings opportunities for your current AI tooling configuration.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {recommendations.map((item, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-950 border-zinc-200/60 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-zinc-200 dark:bg-zinc-800 transition-colors group-hover:bg-emerald-500" />
                <div className="p-6 sm:p-8 pl-6 sm:pl-8">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                    <div className="space-y-3.5 flex-1">
                      <div>
                        <div className="flex items-center gap-3 mb-1.5">
                          <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">
                            {item.tool}
                          </h4>
                          <Badge variant="outline" className="text-xs font-medium text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                            Current: {item.currentPlan}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-500">
                          ↳ {item.recommendation}
                        </p>
                      </div>
                      <p className="text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                        {item.rationale}
                      </p>
                    </div>

                    <div className="flex flex-col items-start sm:items-end sm:text-right shrink-0 pt-2 sm:pt-0">
                      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                        Monthly Savings
                      </span>
                      <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                        ${item.monthlySavings.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
