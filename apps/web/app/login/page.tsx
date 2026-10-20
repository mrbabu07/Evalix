import { AuthForm } from "@/components/auth-form";
import { AuthShell } from "@/components/auth-shell";
export default function LoginPage() { return <AuthShell title="Sign in to your workspace" subtitle="Use your account details to continue."><AuthForm mode="login" /></AuthShell>; }
