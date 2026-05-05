import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type ChartSceneProps = {
  title: string;
  /** Normalized points 0–1 for a simple line chart */
  series: number[];
  accentColor: string;
};

export const ChartScene: React.FC<ChartSceneProps> = ({
  title,
  series,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [8, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const w = 900;
  const h = 320;
  const pad = 40;
  const innerW = w - pad * 2;
  const innerH = h - pad * 2;
  const pts = series.map((y, i) => {
    const x =
      series.length === 1
        ? pad + innerW / 2
        : pad + (innerW * i) / (series.length - 1);
    const yy = pad + innerH * (1 - y);
    return { x, y: yy };
  });
  const visibleCount = Math.max(1, Math.ceil(draw * (pts.length - 1)));
  const pathD = pts
    .slice(0, visibleCount + 1)
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <AbsoluteFill className="bg-white">
      <div className="flex h-full flex-col px-20 py-16">
        <h2 className="mb-8 text-3xl font-semibold text-slate-800">{title}</h2>
        <div className="flex flex-1 items-center justify-center">
          <svg
            viewBox={`0 0 ${w} ${h}`}
            className="max-w-full drop-shadow-sm"
            role="img"
            aria-label={title}
          >
            <rect
              x={pad}
              y={pad}
              width={innerW}
              height={innerH}
              rx={12}
              fill="#f8fafc"
              stroke="#e2e8f0"
            />
            <path
              d={pathD}
              fill="none"
              stroke={accentColor}
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};
