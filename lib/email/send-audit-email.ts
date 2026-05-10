import { resend } from "./resend";

export interface SendAuditEmailParams {
  toEmail: string;
  monthlySavings: number;
  annualSavings: number;
  summary: string;
}

/**
 * Sends an email containing the audit results to the captured lead.
 * 
 * @param params - The recipient email, calculated savings, and audit summary
 * @returns The response payload from the Resend API
 */
export async function sendAuditEmail({
  toEmail,
  monthlySavings,
  annualSavings,
  summary,
}: SendAuditEmailParams) {
  try {
    const formattedMonthly = monthlySavings.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    
    const formattedAnnual = annualSavings.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1e293b;">
        <h1 style="font-size: 24px; font-weight: 700; color: #0f172a; margin-bottom: 24px;">
          Your StackSpend Audit Results
        </h1>
        
        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 24px;">
          Thank you for completing your AI tooling audit. We've analyzed your current stack and identified immediate opportunities to optimize your spending without sacrificing capabilities.
        </p>

        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-top: 0; margin-bottom: 12px;">
            Potential Savings
          </h2>
          <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
            <div>
              <p style="font-size: 14px; color: #64748b; margin: 0 0 4px 0;">Monthly</p>
              <p style="font-size: 24px; font-weight: 600; color: #0f172a; margin: 0;">${formattedMonthly}</p>
            </div>
            <div style="text-align: right;">
              <p style="font-size: 14px; color: #64748b; margin: 0 0 4px 0;">Annual</p>
              <p style="font-size: 24px; font-weight: 600; color: #059669; margin: 0;">${formattedAnnual}</p>
            </div>
          </div>
        </div>

        <h2 style="font-size: 18px; font-weight: 600; color: #0f172a; margin-bottom: 16px;">
          Audit Summary
        </h2>
        <p style="font-size: 16px; line-height: 1.6; color: #334155; background-color: #f1f5f9; padding: 16px; border-radius: 8px; margin-bottom: 32px;">
          ${summary}
        </p>

        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 24px;">
          If you have any questions or would like to discuss a customized implementation plan for your team, please reply directly to this email.
        </p>
        
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin-bottom: 24px;" />
        
        <p style="font-size: 14px; color: #64748b; margin: 0;">
          Best regards,<br/>
          <strong>The StackSpend Team</strong>
        </p>
      </div>
    `;

    const response = await resend.emails.send({
      from: "StackSpend <hello@stackspend.com>",
      to: [toEmail],
      subject: "Your StackSpend AI Savings Report",
      html: htmlBody,
    });

    if (response.error) {
      console.error("Resend API Error:", response.error);
      throw new Error(`Failed to send email: ${response.error.message}`);
    }

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred while sending the email.");
  }
}
