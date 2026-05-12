export type ToolName =
  | "cursor"
  | "copilot"
  | "claude"
  | "chatgpt"
  | "anthropic-api"
  | "openai-api"
  | "gemini"
  | "windsurf";

export type UseCase =
  | "coding"
  | "writing"
  | "research"
  | "data"
  | "mixed"
  | "design";

export interface ToolSpendInput {
  tool: ToolName;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export interface AuditInput {
  teamSize: number;
  primaryUseCase: UseCase;
  tools: ToolSpendInput[];
}

export interface Recommendation {
  tool: string;
  currentPlan: string;
  title: string;
  rationale: string;
  monthlySavings: number;
}
export interface AuditResult {
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  recommendations: Recommendation[];
};
export interface SendAuditEmailParams {
  toEmail: string;
  monthlySavings: number;
  annualSavings: number;
  summary: string;
}