import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import type { ZipMarketReportProps } from "../index";
import { AgentHeadshotOverlay } from "../components/AgentHeadshotOverlay";
import { PersistentBanner } from "../components/PersistentBanner";

type SlidesSceneProps = ZipMarketReportProps & {
  chartImageUrl?: string;
  showHeadshot?: boolean;
};

export const SlidesScene = ({ slides, chartImageUrl, showHeadshot, agent }: SlidesSceneProps) => {
  const frame = useCurrentFrame();

  // Fade in at start of each slide
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const fallback = slides?.[0];
  const imageUrl = chartImageUrl || fallback;

  if (!slides || slides.length === 0) {
    return (
      <AbsoluteFill style={{ background: "#0a0f1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "white", fontSize: 40 }}>No slides available</p>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{ background: "#0a0f1a" }}>

      {/* External chart image */}
      <Img
        src={imageUrl}
        style={{
          width:      "100%",
          height:     "100%",
          objectFit:  "cover",
          opacity,
        }}
      />
      <PersistentBanner agent={agent} />
      {showHeadshot ? <AgentHeadshotOverlay headshotUrl={agent.headshotUrl} /> : null}
    </AbsoluteFill>
  );
};