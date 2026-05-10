"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  teamSize: z.number().min(1, "Team size must be at least 1"),
  primaryUseCase: z.string().min(1, "Please select a primary use case"),
});

type FormValues = z.infer<typeof formSchema>;

export function AuditForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamSize: 1,
      primaryUseCase: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-2xl bg-white shadow-xl border border-zinc-200/60 dark:bg-zinc-950 dark:border-zinc-800 transition-all hover:shadow-2xl">
      <div className="mb-8 text-center space-y-2">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Audit Configuration
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Set up your organization&apos;s AI tooling parameters.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2.5">
          <Label htmlFor="teamSize" className="text-sm font-medium">
            Team Size
          </Label>
          <Input
            id="teamSize"
            type="number"
            {...register("teamSize", { valueAsNumber: true })}
            className="w-full h-11 transition-colors"
            placeholder="e.g. 10"
          />
          {errors.teamSize && (
            <p className="text-[13px] text-red-500 font-medium">{errors.teamSize.message}</p>
          )}
        </div>

        <div className="space-y-2.5">
          <Label htmlFor="primaryUseCase" className="text-sm font-medium">
            Primary Use Case
          </Label>
          <Controller
            control={control}
            name="primaryUseCase"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="h-11 transition-colors">
                  <SelectValue placeholder="Select a use case" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="coding">Coding</SelectItem>
                  <SelectItem value="writing">Writing</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="data">Data</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.primaryUseCase && (
            <p className="text-[13px] text-red-500 font-medium">{errors.primaryUseCase.message}</p>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full h-11 text-base font-medium rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          Generate Audit Report
        </Button>
      </form>
    </div>
  );
}
