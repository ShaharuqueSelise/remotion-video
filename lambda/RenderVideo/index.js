const { renderMediaOnLambda } = require("@remotion/lambda/client");

exports.handler = async (event) => {
  console.log("Starting render for zip:", event.zipCode);
  console.log("Slide count:", event.slides?.length);
  console.log("Slides:", JSON.stringify(event.slides));

  const { renderId, bucketName } = await renderMediaOnLambda({
    region:          "us-east-2",
    functionName:    process.env.REMOTION_FUNCTION_NAME,
    serveUrl:        process.env.REMOTION_SITE_URL,
    composition:     "ZipMarketReport",
    inputProps: {
      zipCode:      event.zipCode,
      cityName:     event.cityName,
      countyName:   event.countyName,
      month:        event.month,
      stats:        event.stats,
      agent:        event.agent,
      voiceoverUrl: event.voiceoverUrl,
      slides:       event.slides,
    },
    codec:           "h264",
    imageFormat:     "jpeg",
    maxRetries:      1,
    framesPerLambda: 150,  // ← increase from 30 to 150 (fewer Lambda spawns)
    privacy:         "public",
    outName:         `${event.zipCode}-${event.month}.mp4`,
  });

  console.log("Render started. renderId:", renderId);

  return {
    ...event,
    renderId,
    bucketName,
    renderStatus: "IN_PROGRESS",
  };
};


