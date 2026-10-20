import { Logo } from "./logo";

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return <main className="grid min-h-screen lg:grid-cols-[1.05fr_.95fr]">
    <section className="relative hidden overflow-hidden bg-slate-950 p-14 text-white lg:flex lg:flex-col">
      <div className="absolute -right-24 top-24 size-80 rounded-full bg-blue-500/25 blur-3xl" /><div className="absolute bottom-0 left-0 size-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <Logo /><div className="relative my-auto max-w-xl"><p className="mb-5 text-sm font-bold uppercase tracking-[.2em] text-blue-300">Review with clarity</p><h1 className="font-[var(--font-heading)] text-5xl font-extrabold leading-tight">From project submission to useful feedback.</h1><p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">A focused workspace for students to share their work and mentors to make confident review decisions.</p></div>
      <p className="text-sm text-slate-400">Structured submissions. Thoughtful reviews. Visible progress.</p>
    </section>
    <section className="flex items-center justify-center p-6 sm:p-10"><div className="w-full max-w-md"><div className="mb-10 lg:hidden"><Logo /></div><p className="text-sm font-bold uppercase tracking-[.18em] text-primary">Welcome to Evalix</p><h2 className="mt-3 font-[var(--font-heading)] text-3xl font-extrabold">{title}</h2><p className="mb-8 mt-2 text-slate-500">{subtitle}</p>{children}</div></section>
  </main>;
}
