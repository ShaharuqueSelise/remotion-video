import { AbsoluteFill } from "remotion";
import type { ZipMarketReportProps } from "../index";
import { PersistentBanner } from "../components/PersistentBanner";

const CTA_HEADLINES: Record<ZipMarketReportProps["ctaVariant"], string> = {
  consultation: "Get a Custom Pricing Strategy",
  valuation: "Request Your Home Value Review",
  buyer_seller: "Planning to Buy or Sell This Year?",
};

export const CtaScene: React.FC<ZipMarketReportProps> = ({ ctaVariant, ctaText, agent }) => {
  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 80% 10%, #28456f 0%, #0a1526 62%, #040912 100%)",
        color: "white",
        padding: "120px 110px",
      }}
    >
      <div style={{ color: agent.accentColor, textTransform: "uppercase", letterSpacing: 2, fontSize: 24 }}>
        Call To Action
      </div>
      <h2 style={{ fontSize: 76, margin: "18px 0 14px", maxWidth: 1300 }}>{CTA_HEADLINES[ctaVariant]}</h2>
      <p style={{ fontSize: 36, margin: 0, maxWidth: 1350, opacity: 0.92 }}>{ctaText}</p>
      <PersistentBanner agent={agent} />
    </AbsoluteFill>
  );
};
