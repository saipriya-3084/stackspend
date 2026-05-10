"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  companyName: z.string().optional(),
});

export type LeadCaptureFormValues = z.infer<typeof formSchema>;

export interface LeadCaptureFormProps {
  onSubmit: (values: LeadCaptureFormValues) => Promise<void> | void;
}

export function LeadCaptureForm({ onSubmit }: LeadCaptureFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadCaptureFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      companyName: "",
    },
  });

  const handleFormSubmit = async (values: LeadCaptureFormValues) => {
    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-sm border-slate-200">
      <CardHeader className="text-center space-y-1 pb-6 pt-8">
        <CardTitle className="text-xl font-semibold tracking-tight text-slate-900">
          Save Your Results
        </CardTitle>
        <CardDescription className="text-sm text-slate-500">
          Get your customized AI savings report delivered directly to your inbox.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-slate-900">
              Work Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className="w-full h-10 border-slate-200 focus-visible:ring-slate-900 shadow-sm"
              placeholder="you@company.com"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-sm font-medium text-slate-900">
              Company Name <span className="text-slate-400 font-normal">(Optional)</span>
            </Label>
            <Input
              id="companyName"
              type="text"
              {...register("companyName")}
              className="w-full h-10 border-slate-200 focus-visible:ring-slate-900 shadow-sm"
              placeholder="Acme Corp"
              disabled={isSubmitting}
            />
            {errors.companyName && (
              <p className="text-xs text-red-500 font-medium">{errors.companyName.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full h-10 mt-2 bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-sm transition-colors"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send me the report"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
