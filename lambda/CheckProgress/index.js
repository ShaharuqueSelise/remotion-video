const { getRenderProgress } = require("@remotion/lambda/client");

exports.handler = async (event) => {
  const { renderId, bucketName } = event;
  console.log("Checking progress for render:", renderId);

  try {
    const progress = await getRenderProgress({
      renderId,
      bucketName,
      functionName: process.env.REMOTION_FUNCTION_NAME,
      region:       "us-east-2",
    });

    console.log(`Progress: ${Math.round(progress.overallProgress * 100)}%`);

    if (progress.fatalErrorEncountered) {
      throw new Error(`Render failed: ${progress.errors?.map(e => e.message).join(", ")}`);
    }

    if (progress.done) {
      console.log("Render complete! Output:", progress.outputFile);
      return {
        ...event,
        renderStatus: "DONE",
        progress:     100,
        outputUrl:    progress.outputFile,
      };
    }

    return {
      ...event,
      renderStatus: "IN_PROGRESS",
      progress:     Math.round(progress.overallProgress * 100),
      outputUrl:    null,
    };

  } catch (err) {
    console.error("Error checking render progress:", err);
    throw err;
  }
};