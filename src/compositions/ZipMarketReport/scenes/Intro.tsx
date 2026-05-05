import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { ZipMarketReportProps } from "../index";

export const Intro = ({ cityName, zipCode, month, agent }: ZipMarketReportProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = spring({ frame, fps, config: { damping: 12 }, durationInFrames: 30 });
  const titleSlide = interpolate(titleY, [0, 1], [60, 0]);
  const opacity = interpolate(frame, [0, 20], [0, 1]);

  return (
    <AbsoluteFill style={{ background: agent.primaryColor, opacity }}>
      {/* Agent logo top-right */}
      <img src={agent.logoUrl} style={{
        position: "absolute", top: 60, right: 80,
        height: 80, objectFit: "contain"
      }} />

      {/* Main title */}
      <div style={{
        position: "absolute", bottom: 200, left: 120,
        transform: `translateY(${titleSlide}px)`,
      }}>
        <p style={{ color: agent.accentColor, fontSize: 28, margin: 0, letterSpacing: 4 }}>
          {month.toUpperCase()} MARKET REPORT
        </p>
        <h1 style={{ color: "white", fontSize: 96, margin: "8px 0 0", fontWeight: 700 }}>
          {cityName}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 32, margin: 0 }}>
          ZIP Code {zipCode}
        </p>
      </div>

      {/* Agent name bottom bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "rgba(0,0,0,0.4)", padding: "20px 120px",
        display: "flex", alignItems: "center", gap: 20
      }}>
        <span style={{ color: "white", fontSize: 22 }}>Brought to you by</span>
        <span style={{ color: agent.accentColor, fontSize: 22, fontWeight: 600 }}>
          {agent.name} · {agent.brokerage}
        </span>
      </div>
    </AbsoluteFill>
  );
};