import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import type { ZipMarketReportProps } from "../index";

type SlidesSceneProps = ZipMarketReportProps & { framesPerSlide: number };

export const SlidesScene = ({ slides, agent, framesPerSlide }: SlidesSceneProps) => {
  const frame = useCurrentFrame();

  const currentSlideIndex = Math.min(
    Math.floor(frame / framesPerSlide),
    Math.max(slides.length - 1, 0)
  );
  const slideFrame = frame - currentSlideIndex * framesPerSlide;

  // Fade in at start of each slide
  const opacity = interpolate(slideFrame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  if (!slides || slides.length === 0) {
    return (
      <AbsoluteFill style={{ background: "#0a0f1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "white", fontSize: 40 }}>No slides available</p>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{ background: "#0a0f1a" }}>

      {/* Slide image */}
      <Img
        src={slides[currentSlideIndex]}
        style={{
          width:      "100%",
          height:     "100%",
          objectFit:  "contain",
          opacity,
        }}
      />

      {/* Slide counter top right */}
      <div style={{
        position:   "absolute",
        top:        30,
        right:      40,
        background: "rgba(0,0,0,0.5)",
        color:      "rgba(255,255,255,0.7)",
        fontSize:   20,
        padding:    "6px 14px",
        borderRadius: 20,
      }}>
        {currentSlideIndex + 1} / {slides.length}
      </div>

      {/* Agent branding bar at bottom */}
      <div style={{
        position:   "absolute",
        bottom:     0,
        left:       0,
        right:      0,
        background: agent.primaryColor,
        padding:    "14px 40px",
        display:    "flex",
        alignItems: "center",
        gap:        16,
      }}>
        {agent.logoUrl ? (
          <Img
            src={agent.logoUrl}
            style={{ height: 40, objectFit: "contain" }}
          />
        ) : null}
        <span style={{ color: agent.accentColor, fontSize: 20, fontWeight: 600 }}>
          {agent.name}
          {agent.brokerage ? ` · ${agent.brokerage}` : ""}
        </span>
        {agent.phone ? (
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 18, marginLeft: "auto" }}>
            {agent.phone}
          </span>
        ) : null}
      </div>

    </AbsoluteFill>
  );
};