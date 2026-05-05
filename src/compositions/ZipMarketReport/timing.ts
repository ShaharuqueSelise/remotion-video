export const ZIP_REPORT_FPS = 30;

// 2.5 min sweet spot — fits under Lambda limit comfortably
export const ZIP_MARKET_MIN_DURATION_SECONDS = 150; // 2.5 minutes

const INTRO_FRAMES  = 90;  // 3 sec
const STATS_FRAMES  = 120; // 4 sec
const OUTRO_FRAMES  = 90;  // 3 sec

const SLIDE_BASE_FRAMES = 60; // 2 sec per slide minimum

const FIXED_OUTSIDE_SLIDES = INTRO_FRAMES + STATS_FRAMES + OUTRO_FRAMES; // 300 frames = 10 sec

export function getSlidesSectionFrames(slideCount: number): number {
  // 150 sec × 30fps = 4500 total frames
  // 4500 - 300 fixed = 4200 frames for slides section
  const minTotalFrames   = ZIP_REPORT_FPS * ZIP_MARKET_MIN_DURATION_SECONDS;
  const minSlidesSection = Math.max(0, minTotalFrames - FIXED_OUTSIDE_SLIDES);

  if (slideCount === 0) {
    return Math.max(60, minSlidesSection);
  }

  // Stretch slides to fill 2.5 min minimum
  // e.g. 9 slides → 4200 ÷ 9 = ~467 frames per slide (~15 sec each)
  return Math.max(slideCount * SLIDE_BASE_FRAMES, minSlidesSection);
}

export function getZipMarketReportDurationInFrames(slideCount: number): number {
  return FIXED_OUTSIDE_SLIDES + getSlidesSectionFrames(slideCount);
}

export function getFramesPerSlide(
  slideCount: number,
  slidesSectionFrames: number
): number {
  return slidesSectionFrames / Math.max(slideCount, 1);
}