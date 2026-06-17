import { Composition } from "remotion";
import {
  ZipMarketReport,
  schema,
} from "./compositions/ZipMarketReport";
import { getShortsDurationInFrames, getZipMarketReportDurationInFrames } from "./compositions/ZipMarketReport/timing";
import {
  shortsSchema,
  ZipMarketReportShorts,
} from "./compositions/ZipMarketReportShorts";

export const RemotionRoot = () => (
  <>
    <Composition
      id="ZipMarketReport"
      component={ZipMarketReport}
      calculateMetadata={() => ({
        durationInFrames: getZipMarketReportDurationInFrames(),
      })}
      fps={30}
      width={1920}
      height={1080}
      schema={schema}
      defaultProps={{
        zipCode: "90210",
        cityName: "Beverly Hills",
        countyName: "Los Angeles County",
        month: "2024-11",
        voiceoverUrl: "https://voice-over-amazon-polly-1.s3.us-east-2.amazonaws.com/voiceovers/90210-1777491461981.wav",
        musicUrl: "",
        hookStat: "Median sales price held firm this month while motivated inventory expanded.",
        selfieVideoUrl: "",
        slides: [
          "https://pdf-images-bucket-zip-month.s3.us-east-2.amazonaws.com/images/90210/2024-11/page-1.jpg",
          "https://pdf-images-bucket-zip-month.s3.us-east-2.amazonaws.com/images/90210/2024-11/page-2.jpg",
        ],
        chartSlides: [
          { key: "medianSalesPrice", imageUrl: "https://pdf-images-bucket-zip-month.s3.us-east-2.amazonaws.com/images/90210/2024-11/page-1.jpg", showHeadshot: true },
          { key: "medianPricePerSqft", imageUrl: "https://pdf-images-bucket-zip-month.s3.us-east-2.amazonaws.com/images/90210/2024-11/page-2.jpg", showHeadshot: true },
          { key: "activeListings", imageUrl: "https://pdf-images-bucket-zip-month.s3.us-east-2.amazonaws.com/images/90210/2024-11/page-3.jpg", showHeadshot: false },
          { key: "daysOnMarket", imageUrl: "https://pdf-images-bucket-zip-month.s3.us-east-2.amazonaws.com/images/90210/2024-11/page-4.jpg", showHeadshot: false },
          { key: "priceReductions", imageUrl: "https://pdf-images-bucket-zip-month.s3.us-east-2.amazonaws.com/images/90210/2024-11/page-5.jpg", showHeadshot: false },
          { key: "listVsSold", imageUrl: "https://pdf-images-bucket-zip-month.s3.us-east-2.amazonaws.com/images/90210/2024-11/page-6.jpg", showHeadshot: false },
        ],
        dollarBuysText: "A $1.25M budget currently buys a 3-bed updated home near core retail corridors.",
        notableSalesVariant: "notable",
        notableSalesItems: [
          { address: "123 Palm Ave", priceLabel: "$1.42M", bedsBaths: "4 bd · 3 ba", imageUrl: "" },
          { address: "55 Oak Canyon Dr", priceLabel: "$1.18M", bedsBaths: "3 bd · 2 ba", imageUrl: "" },
          { address: "890 Sunset Ln", priceLabel: "$1.67M", bedsBaths: "5 bd · 4 ba", imageUrl: "" },
        ],
        localMomentText: "Open house traffic is strongest near renovated inventory and good commuter access.",
        ctaVariant: "consultation",
        ctaText: "Message me to build your pricing and timing strategy for this quarter.",
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
          email: "jane@smithrealty.com",
          logoUrl: "",
          headshotUrl: "",
          primaryColor: "#1a3a5c",
          accentColor: "#c9a84c",
        },
      }}
    />
    <Composition
      id="ZipMarketReportShorts"
      component={ZipMarketReportShorts}
      calculateMetadata={() => ({
        durationInFrames: getShortsDurationInFrames(),
      })}
      fps={30}
      width={1080}
      height={1920}
      schema={shortsSchema}
      defaultProps={{
        zipCode: "90210",
        cityName: "Beverly Hills",
        countyName: "Los Angeles County",
        month: "2024-11",
        voiceoverUrl: "",
        musicUrl: "",
        hookStat: "Inventory is up, and pricing remains resilient in top school pockets.",
        selfieVideoUrl: "",
        slides: [],
        chartSlides: [{ key: "medianSalesPrice", imageUrl: "https://pdf-images-bucket-zip-month.s3.us-east-2.amazonaws.com/images/90210/2024-11/page-1.jpg", showHeadshot: true }],
        dollarBuysText: "",
        notableSalesVariant: "notable",
        notableSalesItems: [],
        localMomentText: "",
        ctaVariant: "valuation",
        ctaText: "Tap to request your quick home value range.",
        shortsChartIndex: 0,
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
          email: "jane@smithrealty.com",
          logoUrl: "",
          headshotUrl: "",
          primaryColor: "#1a3a5c",
          accentColor: "#c9a84c",
        },
      }}
    />
  </>
);