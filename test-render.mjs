import { renderMediaOnLambda, getRenderProgress } from "@remotion/lambda/client";
import * as dotenv from "dotenv";
dotenv.config();

console.log("🎬 Starting test render...");
console.log("Function:", process.env.REMOTION_FUNCTION_NAME);
console.log("Site URL:", process.env.REMOTION_SITE_URL);

// ── Step 1: Start the render ──────────────────────────────
const { renderId, bucketName } = await renderMediaOnLambda({
  region: "us-east-2",
  functionName: process.env.REMOTION_FUNCTION_NAME,
  serveUrl: process.env.REMOTION_SITE_URL,
  composition: "ZipMarketReport",

  inputProps: {
    zipCode: "90210",
    cityName: "Beverly Hills",
    countyName: "Los Angeles County",
    month: "2025-01",
    stats: {
      medianPrice: 1250000,
      medianPriceChange: 4.2,
      daysOnMarket: 18,
      daysOnMarketChange: -3,
      activeListings: 142,
      activeListingsChange: 8.1,
      soldHomes: 67,
      soldHomesChange: -2.1,
    },
    agent: {
      name: "Jane Smith",
      brokerage: "Smith Realty Group",
      phone: "(310) 555-0100",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/320px-Camponotus_flavomarginatus_ant.jpg",
      primaryColor: "#1a3a5c",
      accentColor: "#c9a84c",
    },
    // ✅ Use a real public MP3 for test audio
    voiceoverUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    // ✅ Use placeholder slide images for now
    slides: [
      "https://via.placeholder.com/1920x1080/1a3a5c/ffffff?text=Slide+1",
      "https://via.placeholder.com/1920x1080/1a3a5c/ffffff?text=Slide+2",
    ],
  },

  codec: "h264",
  imageFormat: "jpeg",
  maxRetries: 1,
  framesPerLambda: 30,
  privacy: "public",
  outName: `test-90210-2025-01.mp4`,
});

console.log("\n✅ Render started!");
console.log("Render ID:", renderId);
console.log("Bucket:", bucketName);

// ── Step 2: Poll for completion ───────────────────────────
console.log("\n⏳ Polling for completion...\n");

const poll = async () => {
  while (true) {
    const progress = await getRenderProgress({
      renderId,
      bucketName,
      functionName: process.env.REMOTION_FUNCTION_NAME,
      region: "us-east-2",
    });

    const pct = Math.round(progress.overallProgress * 100);
    process.stdout.write(`\r Progress: ${pct}%`);

    if (progress.fatalErrorEncountered) {
      console.error("\n\n❌ Render failed!");
      console.error("Errors:", JSON.stringify(progress.errors, null, 2));
      process.exit(1);
    }

    if (progress.done) {
      console.log("\n\n🎉 Render complete!");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("Output URL:", progress.outputFile);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("\nCopy the URL above and open in browser to download your video.");
      break;
    }

    // Wait 5 seconds before next check
    await new Promise((res) => setTimeout(res, 5000));
  }
};

await poll();