import { z } from "zod";
import { AbsoluteFill, Audio, Sequence } from "remotion";
import { Intro } from "./scenes/Intro";
import { StatsScene } from "./scenes/StatsScene";
import { Outro } from "./scenes/Outro";
import { SlidesScene } from "./scenes/SlidesScene";
import {
  getFramesPerSlide,
  getSlidesSectionFrames,
} from "./timing";

export const schema = z.object({
  zipCode: z.string(),
  cityName: z.string(),
  countyName: z.string(),
  month: z.string(),
  voiceoverUrl: z.string(),
  slides: z.array(z.string()).default([]),  // ← add this
  stats: z.object({
    medianPrice: z.number(),
    medianPriceChange: z.number(),
    daysOnMarket: z.number(),
    daysOnMarketChange: z.number(),
    activeListings: z.number(),
    activeListingsChange: z.number(),
    soldHomes: z.number(),
    soldHomesChange: z.number(),
  }),
  agent: z.object({
    name: z.string(),
    brokerage: z.string(),
    phone: z.string(),
    email: z.string().optional().default(""),
    logoUrl: z.string(),
    headshotUrl: z.string().optional().default(""),
    primaryColor: z.string(),
    accentColor: z.string(),
  }),
});

export type ZipMarketReportProps = z.infer<typeof schema>;

export const ZipMarketReport = (props: ZipMarketReportProps) => {
  const slidesFrames = getSlidesSectionFrames(props.slides.length);
  const framesPerSlide = getFramesPerSlide(props.slides.length, slidesFrames);

  return (
    <AbsoluteFill style={{ background: "#0f1923" }}>

      {/* Voiceover plays across entire video */}
      {props.voiceoverUrl ? (
        <Audio src={props.voiceoverUrl} />
      ) : null}

      {/* Scene 1: Intro — 3 sec */}
      <Sequence from={0} durationInFrames={90}>
        <Intro {...props} />
      </Sequence>

      {/* Scene 2: Stats — 4 sec (120 frames) */}
      <Sequence from={90} durationInFrames={120}>   {/* ← change 600 to 120 */}
        <StatsScene {...props} />
      </Sequence>

      {/* Scene 3: PDF Slides */}
      <Sequence from={210} durationInFrames={slidesFrames}>  {/* ← change 690 to 210 */}
        <SlidesScene {...props} framesPerSlide={framesPerSlide} />
      </Sequence>

      {/* Scene 4: Outro */}
      <Sequence from={210 + slidesFrames} durationInFrames={90}>  {/* ← update start */}
        <Outro {...props} />
      </Sequence>

    </AbsoluteFill>
  );
};