"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Loader2 } from "lucide-react";

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

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const formSchema = z.object({
  teamSize: z.coerce.number().min(1, {
    message: "Team size must be at least 1",
  }),

  primaryUseCase: z.string().min(1, {
    message: "Please select a primary use case",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export type FormValues = FormSchema;

export interface AuditFormProps {
  onSubmit: (
    values: FormValues
  ) => Promise<void> | void;
}

export function AuditForm({
  onSubmit,
}: AuditFormProps) {
  const [isSubmitting, setIsSubmitting] =
    React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema) as any,

    defaultValues: {
      teamSize: 1,
      primaryUseCase: "",
    },
  });


  const handleFormSubmit = async (
    values: FormSchema
  ) => {
    try {
      setIsSubmitting(true);

      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md border-slate-200 shadow-sm">
      <CardHeader className="space-y-1 pb-6 pt-8 text-center">
        <CardTitle className="text-2xl font-semibold tracking-tight text-slate-900">
          Audit Configuration
        </CardTitle>

        <CardDescription className="text-sm text-slate-500">
          Set up your organization's AI tooling
          parameters.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-8 pb-8">
        <form
          onSubmit={handleSubmit(
            handleFormSubmit
          )}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label
              htmlFor="teamSize"
              className="text-sm font-medium text-slate-900"
            >
              Team Size
            </Label>

            <Input
              id="teamSize"
              type="number"
              {...register("teamSize")}
              className="h-10 w-full border-slate-200 shadow-sm focus-visible:ring-slate-900"
              placeholder="e.g. 10"
              disabled={isSubmitting}
            />

            {errors.teamSize && (
              <p className="text-xs font-medium text-red-500">
                {errors.teamSize.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="primaryUseCase"
              className="text-sm font-medium text-slate-900"
            >
              Primary Use Case
            </Label>

            <Controller
              control={control}
              name="primaryUseCase"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="h-10 border-slate-200 shadow-sm focus:ring-slate-900">
                    <SelectValue placeholder="Select a use case" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="coding">
                      Coding
                    </SelectItem>

                    <SelectItem value="writing">
                      Writing
                    </SelectItem>

                    <SelectItem value="research">
                      Research
                    </SelectItem>

                    <SelectItem value="data">
                      Data
                    </SelectItem>

                    <SelectItem value="mixed">
                      Mixed
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            {errors.primaryUseCase && (
              <p className="text-xs font-medium text-red-500">
                {
                  errors.primaryUseCase
                    .message
                }
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 h-10 w-full bg-slate-900 font-medium text-white shadow-sm transition-colors hover:bg-slate-800"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Audit Report"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}