import { ReactNode } from "react";

type LabLayoutProps = {
  title: string;
  description: string;
  controls: ReactNode;
  visualization: ReactNode;
  insights?: ReactNode;
  compare?: ReactNode;
};

export function LabLayout({ title, description, controls, visualization, insights, compare }: LabLayoutProps) {
  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-white/75">{description}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/15 bg-slate-900/80 p-4">{controls}</div>
        <div className="rounded-2xl border border-white/15 bg-slate-900/80 p-4">{visualization}</div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>{insights}</div>
        <div>{compare}</div>
      </div>
    </section>
  );
}
