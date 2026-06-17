import { AbsoluteFill } from "remotion";
import type { ZipMarketReportProps } from "../index";
import { PersistentBanner } from "../components/PersistentBanner";

export const LocalMomentScene: React.FC<ZipMarketReportProps> = ({ localMomentText, cityName, agent }) => {
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(150deg, #0c1a2f 0%, #101d31 45%, #1a2c46 100%)",
        color: "white",
        padding: "120px 110px",
      }}
    >
      <div style={{ textTransform: "uppercase", letterSpacing: 2, color: agent.accentColor, fontSize: 25 }}>
        One Thing Happening Here
      </div>
      <h2 style={{ margin: "16px 0 20px", fontSize: 76 }}>{cityName}</h2>
      <p style={{ margin: 0, fontSize: 40, maxWidth: 1450, lineHeight: 1.38 }}>{localMomentText}</p>
      <PersistentBanner agent={agent} />
    </AbsoluteFill>
  );
};
