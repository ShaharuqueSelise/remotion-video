import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type StatCardProps = {
  label: string;
  value: string;
  sublabel?: string;
  delay?: number;
};

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  sublabel,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 120 },
  });
  const y = interpolate(progress, [0, 1], [28, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white/90 px-8 py-6 shadow-lg shadow-slate-200/60 backdrop-blur"
      style={{ opacity, transform: `translateY(${y}px)` }}
    >
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-4xl font-semibold tabular-nums text-slate-900">
        {value}
      </p>
      {sublabel ? (
        <p className="mt-1 text-sm text-slate-600">{sublabel}</p>
      ) : null}
    </div>
  );
};
