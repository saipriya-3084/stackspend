"use server";

import { saveAudit, SaveAuditParams } from "@/lib/db/save-audit";
import { saveLead, SaveLeadParams } from "@/lib/db/save-lead";
import { sendAuditEmail, SendAuditEmailParams } from "@/lib/email/send-audit-email";

export async function submitAuditAction(params: SaveAuditParams) {
  return await saveAudit(params);
}

export async function submitLeadAction(params: SaveLeadParams) {
  return await saveLead(params);
}

export async function sendEmailAction(params: SendAuditEmailParams) {
  return await sendAuditEmail(params);
}
