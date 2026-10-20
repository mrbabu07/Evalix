import { AuthForm } from "@/components/auth-form";
import { AuthShell } from "@/components/auth-shell";
export default function SignupPage() { return <AuthShell title="Create your student account" subtitle="One account, one focused project submission."><AuthForm mode="signup" /></AuthShell>; }
