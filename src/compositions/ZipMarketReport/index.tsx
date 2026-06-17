import { z } from "zod";
import { AbsoluteFill, Audio, Sequence } from "remotion";
import { SonicHookScene } from "./scenes/SonicHookScene";
import { SelfieIntroScene } from "./scenes/SelfieIntroScene";
import { DollarBuysScene } from "./scenes/DollarBuysScene";
import { NotableSalesScene } from "./scenes/NotableSalesScene";
import { LocalMomentScene } from "./scenes/LocalMomentScene";
import { CtaScene } from "./scenes/CtaScene";
import { SlidesScene } from "./scenes/SlidesScene";
import {
  CHART_SEGMENT_SEQUENCE,
  LONG_FORM_SEGMENT_FRAMES,
} from "./timing";

const chartSlideSchema = z.object({
  key: z.enum(CHART_SEGMENT_SEQUENCE),
  imageUrl: z.string(),
  showHeadshot: z.boolean().optional().default(false),
});

const notableSaleItemSchema = z.object({
  address: z.string(),
  priceLabel: z.string(),
  bedsBaths: z.string().optional().default(""),
  imageUrl: z.string().optional().default(""),
});

export const schema = z.object({
  zipCode: z.string(),
  cityName: z.string(),
  countyName: z.string(),
  month: z.string(),
  voiceoverUrl: z.string().optional().default(""),
  musicUrl: z.string().optional().default(""),
  slides: z.array(z.string()).default([]),
  chartSlides: z.array(chartSlideSchema).default([]),
  hookStat: z.string().optional().default("Inventory remains tight while buyer demand is steady."),
  selfieVideoUrl: z.string().optional().default(""),
  dollarBuysText: z
    .string()
    .optional()
    .default("In this market, budget and neighborhood choices shape lot size, condition, and lifestyle."),
  notableSalesVariant: z.enum(["notable", "hot_listing", "mixed"]).default("notable"),
  notableSalesItems: z.array(notableSaleItemSchema).default([]),
  localMomentText: z
    .string()
    .optional()
    .default("A local shift this month is new demand near walkable retail and newer school zones."),
  ctaVariant: z.enum(["consultation", "valuation", "buyer_seller"]).default("consultation"),
  ctaText: z.string().optional().default("Reply to this report for a custom strategy call this week."),
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
export type AgentConfig = ZipMarketReportProps["agent"];
export type NotableSaleItem = z.infer<typeof notableSaleItemSchema>;

export const ZipMarketReport = (props: ZipMarketReportProps) => {
  const chartByKey = new Map(props.chartSlides.map((chartSlide) => [chartSlide.key, chartSlide]));
  const startSonicHook = 0;
  const startSelfieIntro = startSonicHook + LONG_FORM_SEGMENT_FRAMES.sonicHook;
  const startMedianSalesPrice = startSelfieIntro + LONG_FORM_SEGMENT_FRAMES.selfieIntro;
  const startMedianPricePerSqft = startMedianSalesPrice + LONG_FORM_SEGMENT_FRAMES.medianSalesPrice;
  const startDollarBuys = startMedianPricePerSqft + LONG_FORM_SEGMENT_FRAMES.medianPricePerSqft;
  const startActiveListings = startDollarBuys + LONG_FORM_SEGMENT_FRAMES.dollarBuys;
  const startDaysOnMarket = startActiveListings + LONG_FORM_SEGMENT_FRAMES.activeListings;
  const startNotableSales = startDaysOnMarket + LONG_FORM_SEGMENT_FRAMES.daysOnMarket;
  const startLocalMoment = startNotableSales + LONG_FORM_SEGMENT_FRAMES.notableSales;
  const startPriceReductions = startLocalMoment + LONG_FORM_SEGMENT_FRAMES.localMoment;
  const startListVsSold = startPriceReductions + LONG_FORM_SEGMENT_FRAMES.priceReductions;
  const startCta = startListVsSold + LONG_FORM_SEGMENT_FRAMES.listVsSold;

  return (
    <AbsoluteFill style={{ background: "#0f1923" }}>
      {props.voiceoverUrl ? (
        <Audio src={props.voiceoverUrl} />
      ) : null}
      {props.musicUrl ? <Audio src={props.musicUrl} volume={0.2} /> : null}

      <Sequence from={startSonicHook} durationInFrames={LONG_FORM_SEGMENT_FRAMES.sonicHook}>
        <SonicHookScene {...props} />
      </Sequence>

      <Sequence from={startSelfieIntro} durationInFrames={LONG_FORM_SEGMENT_FRAMES.selfieIntro}>
        <SelfieIntroScene {...props} />
      </Sequence>

      <Sequence from={startMedianSalesPrice} durationInFrames={LONG_FORM_SEGMENT_FRAMES.medianSalesPrice}>
        <SlidesScene
          {...props}
          chartImageUrl={chartByKey.get("medianSalesPrice")?.imageUrl}
          showHeadshot={chartByKey.get("medianSalesPrice")?.showHeadshot}
        />
      </Sequence>

      <Sequence
        from={startMedianPricePerSqft}
        durationInFrames={LONG_FORM_SEGMENT_FRAMES.medianPricePerSqft}
      >
        <SlidesScene
          {...props}
          chartImageUrl={chartByKey.get("medianPricePerSqft")?.imageUrl}
          showHeadshot={chartByKey.get("medianPricePerSqft")?.showHeadshot}
        />
      </Sequence>

      <Sequence from={startDollarBuys} durationInFrames={LONG_FORM_SEGMENT_FRAMES.dollarBuys}>
        <DollarBuysScene {...props} />
      </Sequence>

      <Sequence from={startActiveListings} durationInFrames={LONG_FORM_SEGMENT_FRAMES.activeListings}>
        <SlidesScene
          {...props}
          chartImageUrl={chartByKey.get("activeListings")?.imageUrl}
          showHeadshot={chartByKey.get("activeListings")?.showHeadshot}
        />
      </Sequence>

      <Sequence from={startDaysOnMarket} durationInFrames={LONG_FORM_SEGMENT_FRAMES.daysOnMarket}>
        <SlidesScene
          {...props}
          chartImageUrl={chartByKey.get("daysOnMarket")?.imageUrl}
          showHeadshot={chartByKey.get("daysOnMarket")?.showHeadshot}
        />
      </Sequence>

      <Sequence from={startNotableSales} durationInFrames={LONG_FORM_SEGMENT_FRAMES.notableSales}>
        <NotableSalesScene {...props} />
      </Sequence>

      <Sequence from={startLocalMoment} durationInFrames={LONG_FORM_SEGMENT_FRAMES.localMoment}>
        <LocalMomentScene {...props} />
      </Sequence>

      <Sequence from={startPriceReductions} durationInFrames={LONG_FORM_SEGMENT_FRAMES.priceReductions}>
        <SlidesScene
          {...props}
          chartImageUrl={chartByKey.get("priceReductions")?.imageUrl}
          showHeadshot={chartByKey.get("priceReductions")?.showHeadshot}
        />
      </Sequence>

      <Sequence from={startListVsSold} durationInFrames={LONG_FORM_SEGMENT_FRAMES.listVsSold}>
        <SlidesScene
          {...props}
          chartImageUrl={chartByKey.get("listVsSold")?.imageUrl}
          showHeadshot={chartByKey.get("listVsSold")?.showHeadshot}
        />
      </Sequence>

      <Sequence from={startCta} durationInFrames={LONG_FORM_SEGMENT_FRAMES.cta}>
        <CtaScene {...props} />
      </Sequence>
    </AbsoluteFill>
  );
};