export const ZIP_REPORT_FPS = 30;

export const LONG_FORM_SEGMENT_SECONDS = {
  sonicHook: 8,
  selfieIntro: 12,
  medianSalesPrice: 20,
  medianPricePerSqft: 25,
  dollarBuys: 25,
  activeListings: 20,
  daysOnMarket: 20,
  notableSales: 30,
  localMoment: 20,
  priceReductions: 20,
  listVsSold: 20,
  cta: 15,
} as const;

export const SHORTS_DURATION_SECONDS = 45;

const toFrames = (seconds: number) => Math.round(seconds * ZIP_REPORT_FPS);

export const LONG_FORM_SEGMENT_FRAMES = {
  sonicHook: toFrames(LONG_FORM_SEGMENT_SECONDS.sonicHook),
  selfieIntro: toFrames(LONG_FORM_SEGMENT_SECONDS.selfieIntro),
  medianSalesPrice: toFrames(LONG_FORM_SEGMENT_SECONDS.medianSalesPrice),
  medianPricePerSqft: toFrames(LONG_FORM_SEGMENT_SECONDS.medianPricePerSqft),
  dollarBuys: toFrames(LONG_FORM_SEGMENT_SECONDS.dollarBuys),
  activeListings: toFrames(LONG_FORM_SEGMENT_SECONDS.activeListings),
  daysOnMarket: toFrames(LONG_FORM_SEGMENT_SECONDS.daysOnMarket),
  notableSales: toFrames(LONG_FORM_SEGMENT_SECONDS.notableSales),
  localMoment: toFrames(LONG_FORM_SEGMENT_SECONDS.localMoment),
  priceReductions: toFrames(LONG_FORM_SEGMENT_SECONDS.priceReductions),
  listVsSold: toFrames(LONG_FORM_SEGMENT_SECONDS.listVsSold),
  cta: toFrames(LONG_FORM_SEGMENT_SECONDS.cta),
} as const;

export function getZipMarketReportDurationInFrames(): number {
  return Object.values(LONG_FORM_SEGMENT_FRAMES).reduce((acc, frames) => acc + frames, 0);
}

export function getShortsDurationInFrames(): number {
  return toFrames(SHORTS_DURATION_SECONDS);
}

export type ChartSegmentKey =
  | "medianSalesPrice"
  | "medianPricePerSqft"
  | "activeListings"
  | "daysOnMarket"
  | "priceReductions"
  | "listVsSold";

export const CHART_SEGMENT_SEQUENCE: ChartSegmentKey[] = [
  "medianSalesPrice",
  "medianPricePerSqft",
  "activeListings",
  "daysOnMarket",
  "priceReductions",
  "listVsSold",
];

export function getChartSegmentDurationInFrames(segment: ChartSegmentKey): number {
  return LONG_FORM_SEGMENT_FRAMES[segment];
}