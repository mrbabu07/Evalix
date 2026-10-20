import Link from "next/link";
import { CheckCheck } from "lucide-react";

export function Logo() {
  return <Link href="/" className="inline-flex items-center gap-2 font-[var(--font-heading)] text-xl font-extrabold tracking-tight"><span className="grid size-9 place-items-center rounded-xl bg-primary text-white"><CheckCheck size={20} /></span>Evalix</Link>;
}
