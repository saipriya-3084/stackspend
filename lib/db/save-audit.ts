import { supabase } from "./supabase";

export interface SaveAuditParams {
  teamSize: number;
  primaryUseCase: string;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
}

export async function saveAudit(params: SaveAuditParams) {
  try {
    const { data, error } = await supabase
      .from("audits")
      .insert([
        {
          team_size: params.teamSize,
          primary_use_case: params.primaryUseCase,
          total_monthly_savings: params.totalMonthlySavings,
          total_annual_savings: params.totalAnnualSavings,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      throw new Error(`Failed to save audit: ${error.message}`);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred while saving the audit.");
  }
}
