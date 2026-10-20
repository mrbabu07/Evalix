"use client";
import { DashboardShell } from "@/components/dashboard-shell";
import { MentorDashboard } from "@/components/mentor-dashboard";
export default function MentorPage() { return <DashboardShell requiredRole="MENTOR" eyebrow="Mentor portal">{() => <MentorDashboard/>}</DashboardShell>; }
