import { AbsoluteFill, OffthreadVideo } from "remotion";
import type { ZipMarketReportProps } from "../index";
import { PersistentBanner } from "../components/PersistentBanner";

export const SelfieIntroScene: React.FC<ZipMarketReportProps> = ({ selfieVideoUrl, agent }) => {
  return (
    <AbsoluteFill style={{ background: "#050b15" }}>
      {selfieVideoUrl ? (
        <OffthreadVideo src={selfieVideoUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 46,
          }}
        >
          Selfie intro clip unavailable
        </AbsoluteFill>
      )}
      <div
        style={{
          position: "absolute",
          left: 40,
          bottom: 130,
          background: "rgba(0,0,0,0.62)",
          borderLeft: `6px solid ${agent.accentColor}`,
          borderRadius: 8,
          padding: "16px 20px",
          color: "white",
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700 }}>{agent.name}</div>
        <div style={{ fontSize: 20, opacity: 0.85 }}>{agent.brokerage}</div>
      </div>
      <PersistentBanner agent={agent} />
    </AbsoluteFill>
  );
};
