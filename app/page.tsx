import { AuditForm } from "@/components/audit-form";

export default function Home() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-zinc-50 dark:bg-black p-6 font-sans">
      <main className="w-full max-w-4xl flex flex-col items-center justify-center space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            StackSpend
          </h1>
          <p className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium">
            Audit your AI tooling spend in minutes.
          </p>
        </div>
        
        <div className="w-full">
          <AuditForm />
        </div>
      </main>
    </div>
  );
}
