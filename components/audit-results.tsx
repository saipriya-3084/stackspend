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
        <Card className="bg-white border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            <div className="flex-1 p-6 sm:p-8">
              <h2 className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
                Total Monthly Savings
              </h2>
              <div className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 flex items-baseline gap-1">
                <span className="text-slate-400 text-3xl sm:text-4xl">$</span>
                <span>{totalMonthlySavings.toLocaleString()}</span>
              </div>
            </div>
            
            <Separator orientation="vertical" className="hidden sm:block h-auto border-slate-100" />
            <Separator orientation="horizontal" className="block sm:hidden border-slate-100" />
            
            <div className="flex-1 p-6 sm:p-8 bg-slate-50">
              <h2 className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
                Projected Annual Savings
              </h2>
              <div className="text-4xl sm:text-5xl font-bold tracking-tight text-emerald-600 flex items-baseline gap-1">
                <span className="text-emerald-600/60 text-3xl sm:text-4xl">$</span>
                <span>{totalAnnualSavings.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Recommendations Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900">
            Optimization Opportunities
          </h3>
          <Badge variant="secondary" className="rounded-md font-medium bg-slate-100 text-slate-700">
            {recommendations.length} {recommendations.length === 1 ? "Item" : "Items"}
          </Badge>
        </div>

        {recommendations.length === 0 ? (
          <Card className="p-12 border-dashed border-slate-200 bg-slate-50 rounded-xl flex flex-col items-center justify-center text-center shadow-none">
            <h4 className="text-lg font-medium text-slate-900 mb-2">
              Your stack is optimized
            </h4>
            <p className="text-sm text-slate-500 max-w-sm">
              We couldn&apos;t find any immediate savings opportunities for your current AI tooling configuration.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {recommendations.map((item, index) => (
              <Card 
                key={index} 
                className="overflow-hidden rounded-xl bg-white border-slate-200 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-stretch h-full">
                  {/* Left accent indicator */}
                  <div className="hidden sm:block w-1.5 bg-slate-100 shrink-0" />
                  
                  <div className="p-5 sm:p-6 flex-1 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                    <div className="space-y-3 flex-1">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <h4 className="text-lg font-semibold text-slate-900 tracking-tight">
                            {item.tool}
                          </h4>
                          <Badge variant="outline" className="text-xs font-medium text-slate-500 border-slate-200 bg-white">
                            Current: {item.currentPlan}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-emerald-600">
                          ↳ {item.recommendation}
                        </p>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                        {item.rationale}
                      </p>
                    </div>

                    <div className="flex flex-col items-start sm:items-end sm:text-right shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 sm:mt-0">
                        Monthly Savings
                      </span>
                      <div className="text-2xl font-bold tracking-tight text-slate-900">
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
