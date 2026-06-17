import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { ZipMarketReportProps } from "../index";

export const SonicHookScene: React.FC<ZipMarketReportProps> = ({ cityName, month, hookStat, agent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rise = spring({ frame, fps, config: { damping: 14 } });
  const y = interpolate(rise, [0, 1], [24, 0]);
  const opacity = interpolate(frame, [0, 16], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 15% 20%, #1f3658 0%, #08111f 60%, #050b15 100%)",
        color: "white",
        padding: "120px 110px",
        opacity,
      }}
    >
      <div style={{ textTransform: "uppercase", letterSpacing: 3, color: agent.accentColor, fontSize: 24 }}>
        {month} Market Pulse
      </div>
      <h1 style={{ margin: "20px 0 10px", fontSize: 92, transform: `translateY(${y}px)` }}>{cityName}</h1>
      <p style={{ margin: 0, fontSize: 46, color: "rgba(255,255,255,0.88)", maxWidth: 1400 }}>{hookStat}</p>
    </AbsoluteFill>
  );
};
