import { AbsoluteFill } from "remotion";
import type { ZipMarketReportProps } from "../index";
import { PersistentBanner } from "../components/PersistentBanner";

export const DollarBuysScene: React.FC<ZipMarketReportProps> = ({ cityName, dollarBuysText, agent }) => {
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(120deg, #0a1627 0%, #132843 55%, #0f1e34 100%)",
        color: "white",
        padding: "130px 110px",
      }}
    >
      <div style={{ color: agent.accentColor, textTransform: "uppercase", letterSpacing: 2, fontSize: 26 }}>
        What Your Dollar Buys
      </div>
      <h2 style={{ fontSize: 78, margin: "22px 0" }}>{cityName}</h2>
      <p style={{ maxWidth: 1500, fontSize: 40, lineHeight: 1.35, margin: 0 }}>{dollarBuysText}</p>
      <PersistentBanner agent={agent} />
    </AbsoluteFill>
  );
};
