import { interpolate, useCurrentFrame } from "remotion";

type AgentBrandProps = {
  agentName: string;
  tagline?: string;
  accentColor?: string;
};

export const AgentBrand: React.FC<AgentBrandProps> = ({
  agentName,
  tagline = "Your local market expert",
  accentColor = "#0f766e",
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [0, 18], [12, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      className="flex flex-col items-center gap-2 text-center"
      style={{ opacity, transform: `translateY(${y}px)` }}
    >
      <div
        className="h-1 w-24 rounded-full"
        style={{ backgroundColor: accentColor }}
      />
      <h1 className="text-5xl font-semibold tracking-tight text-slate-900">
        {agentName}
      </h1>
      {tagline ? (
        <p className="text-xl font-medium text-slate-600">{tagline}</p>
      ) : null}
    </div>
  );
};
