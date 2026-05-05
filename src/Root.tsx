import { Composition } from "remotion";
import {
  ZipMarketReport,
  schema,
} from "./compositions/ZipMarketReport";
import { getZipMarketReportDurationInFrames } from "./compositions/ZipMarketReport/timing";

export const RemotionRoot = () => (
  <Composition
    id="ZipMarketReport"
    component={ZipMarketReport}
    calculateMetadata={({ props }) => ({
      durationInFrames: getZipMarketReportDurationInFrames(props.slides?.length ?? 0),
    })}
    fps={30}
    width={1920}
    height={1080}
    schema={schema}
    defaultProps={{
      zipCode:      "90210",
      cityName:     "Beverly Hills",
      countyName:   "Los Angeles County",
      month:        "2024-11",
      voiceoverUrl: "https://voice-over-amazon-polly-1.s3.us-east-2.amazonaws.com/voiceovers/90210-1775907600499.mp3",
      slides: [
        "https://pdf-images-bucket-zip-month.s3.us-east-2.amazonaws.com/images/90210/2024-11/page-1.jpg",
        "https://pdf-images-bucket-zip-month.s3.us-east-2.amazonaws.com/images/90210/2024-11/page-2.jpg",
        "https://pdf-images-bucket-zip-month.s3.us-east-2.amazonaws.com/images/90210/2024-11/page-3.jpg",
        "https://pdf-images-bucket-zip-month.s3.us-east-2.amazonaws.com/images/90210/2024-11/page-4.jpg",
        "https://pdf-images-bucket-zip-month.s3.us-east-2.amazonaws.com/images/90210/2024-11/page-5.jpg",
        "https://pdf-images-bucket-zip-month.s3.us-east-2.amazonaws.com/images/90210/2024-11/page-6.jpg",
        "https://pdf-images-bucket-zip-month.s3.us-east-2.amazonaws.com/images/90210/2024-11/page-7.jpg",
        "https://pdf-images-bucket-zip-month.s3.us-east-2.amazonaws.com/images/90210/2024-11/page-8.jpg",
        "https://pdf-images-bucket-zip-month.s3.us-east-2.amazonaws.com/images/90210/2024-11/page-9.jpg",
      ],
      stats: {
        medianPrice:          1250000,
        medianPriceChange:    4.2,
        daysOnMarket:         18,
        daysOnMarketChange:   -3,
        activeListings:       142,
        activeListingsChange: 8.1,
        soldHomes:            67,
        soldHomesChange:      -2.1,
      },
      agent: {
        name:         "Jane Smith",
        brokerage:    "Smith Realty Group",
        phone:        "(310) 555-0100",
        email:        "jane@smithrealty.com",
        logoUrl:      "",
        headshotUrl:  "",
        primaryColor: "#1a3a5c",
        accentColor:  "#c9a84c",
      },
    }}
  />
);