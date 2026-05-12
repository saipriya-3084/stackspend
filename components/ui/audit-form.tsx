"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const auditSchema = z.object({
  teamSize: z.coerce
    .number()
    .min(1, "Team size is required"),
  primaryUseCase: z
    .string()
    .min(1, "Use case is required"),
});

export type FormValues = z.infer<
  typeof auditSchema
>;

interface AuditFormProps {
  onSubmit: (values: FormValues) => void;
}

export function AuditForm({
  onSubmit,
}: AuditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(auditSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Team Size
        </label>

        <Input
          type="number"
          placeholder="5"
          {...register("teamSize")}
        />

        {errors.teamSize && (
          <p className="text-sm text-red-500">
            {errors.teamSize.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Primary Use Case
        </label>

        <Input
          placeholder="Coding, Research, Design..."
          {...register("primaryUseCase")}
        />

        {errors.primaryUseCase && (
          <p className="text-sm text-red-500">
            {errors.primaryUseCase.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
      >
        Run Audit
      </Button>
    </form>
  );
}