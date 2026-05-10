import { z } from "zod";
import { supabase } from "./supabase";

const saveLeadSchema = z.object({
  email: z.string().email("Invalid email address format"),
  companyName: z.string().optional(),
  auditId: z.string().min(1, "Audit ID is required"),
});

export type SaveLeadParams = z.infer<typeof saveLeadSchema>;

/**
 * Saves a captured lead into the Supabase 'leads' table after an audit is completed.
 * 
 * @param params - The lead parameters containing email, optional company name, and the related audit ID
 * @returns The newly inserted lead record
 */
export async function saveLead(params: SaveLeadParams) {
  // 1. Validate inputs before hitting the database
  const result = saveLeadSchema.safeParse(params);
  
  if (!result.success) {
    throw new Error(`Validation error: ${result.error.message}`);
  }
  
  const validated = result.data;

  try {
    // 2. Perform the database insert
    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          email: validated.email,
          company_name: validated.companyName || null,
          audit_id: validated.auditId,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      throw new Error(`Failed to save lead: ${error.message}`);
    }

    // 3. Return the inserted row
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred while saving the lead.");
  }
}
