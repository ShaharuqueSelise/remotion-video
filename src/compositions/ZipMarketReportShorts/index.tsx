import { AbsoluteFill, Audio, Sequence } from "remotion";
import { z } from "zod";
import { schema as longFormSchema } from "../ZipMarketReport";
import { SonicHookScene } from "../ZipMarketReport/scenes/SonicHookScene";
import { SlidesScene } from "../ZipMarketReport/scenes/SlidesScene";
import { CtaScene } from "../ZipMarketReport/scenes/CtaScene";
import { ZIP_REPORT_FPS } from "../ZipMarketReport/timing";

export const shortsSchema = longFormSchema.extend({
  shortsChartIndex: z.number().int().nonnegative().default(0),
});

export type ZipMarketReportShortsProps = z.infer<typeof shortsSchema>;

const SHORTS_SEGMENTS = {
  hook: 10 * ZIP_REPORT_FPS,
  chart: 20 * ZIP_REPORT_FPS,
  cta: 15 * ZIP_REPORT_FPS,
};

export const ZipMarketReportShorts: React.FC<ZipMarketReportShortsProps> = (props) => {
  const chartSlide = props.chartSlides[props.shortsChartIndex] ?? props.chartSlides[0];
  const startChart = SHORTS_SEGMENTS.hook;
  const startCta = startChart + SHORTS_SEGMENTS.chart;

  return (
    <AbsoluteFill style={{ background: "#08101f" }}>
      {props.voiceoverUrl ? <Audio src={props.voiceoverUrl} /> : null}
      {props.musicUrl ? <Audio src={props.musicUrl} volume={0.2} /> : null}
      <Sequence from={0} durationInFrames={SHORTS_SEGMENTS.hook}>
        <SonicHookScene {...props} />
      </Sequence>
      <Sequence from={startChart} durationInFrames={SHORTS_SEGMENTS.chart}>
        <SlidesScene
          {...props}
          chartImageUrl={chartSlide?.imageUrl}
          showHeadshot={chartSlide?.showHeadshot}
        />
      </Sequence>
      <Sequence from={startCta} durationInFrames={SHORTS_SEGMENTS.cta}>
        <CtaScene {...props} />
      </Sequence>
    </AbsoluteFill>
  );
};
