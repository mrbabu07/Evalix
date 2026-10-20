import * as React from "react";
import { cn } from "@/lib/utils";

export function Button({ className, variant = "primary", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "outline" | "danger" | "ghost" }) {
  const styles = { primary: "bg-primary text-white hover:bg-blue-700", outline: "border bg-white hover:bg-slate-50", danger: "bg-rose-600 text-white hover:bg-rose-700", ghost: "hover:bg-slate-100" };
  return <button className={cn("inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50", styles[variant], className)} {...props} />;
}

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => <input ref={ref} className={cn("h-11 w-full rounded-lg border bg-white px-3 text-sm placeholder:text-slate-400", className)} {...props} />);
Input.displayName = "Input";
export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => <textarea ref={ref} className={cn("w-full rounded-lg border bg-white px-3 py-3 text-sm placeholder:text-slate-400", className)} {...props} />);
Textarea.displayName = "Textarea";

export function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <label className="grid gap-1.5 text-sm font-medium text-slate-700"><span>{label}</span>{children}{error && <span className="text-xs font-normal text-rose-600">{error}</span>}</label>;
}

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn("rounded-2xl border bg-white shadow-card", className)} {...props} />; }

export function Badge({ status }: { status: Submission["status"] }) {
  const map = { PENDING: "bg-amber-50 text-amber-700 ring-amber-200", APPROVED: "bg-emerald-50 text-emerald-700 ring-emerald-200", REJECTED: "bg-rose-50 text-rose-700 ring-rose-200" };
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-bold capitalize ring-1", map[status])}>{status.toLowerCase()}</span>;
}
import type { Submission } from "@/lib/api";
