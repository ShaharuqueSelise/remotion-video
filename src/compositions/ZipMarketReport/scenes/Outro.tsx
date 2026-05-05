import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import type { ZipMarketReportProps } from "../index";

export const Outro = ({ agent }: ZipMarketReportProps) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1]);

  return (
    <AbsoluteFill style={{
      background: agent.primaryColor, opacity,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 24
    }}>
      <img src={agent.logoUrl} style={{ height: 120, objectFit: "contain" }} />
      <h2 style={{ color: "white", fontSize: 52, margin: 0 }}>{agent.name}</h2>
      <p style={{ color: agent.accentColor, fontSize: 28, margin: 0 }}>{agent.brokerage}</p>
      <div style={{ display: "flex", gap: 48, marginTop: 16 }}>
        <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 22 }}>📞 {agent.phone}</span>
        <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 22 }}>✉ {agent.email}</span>
      </div>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, marginTop: 32 }}>
        Data sourced from MLS. For informational purposes only.
      </p>
    </AbsoluteFill>
  );
};