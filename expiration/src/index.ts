
import { natsWrapper } from "./nats-wrapper";

const start = async () => {

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("No env vars for mongo loaded");
  }
  if (!process.env.NATS_URL) {
    throw new Error("No env vars for mongo loaded");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("No env vars for mongo loaded");
  }
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    ); // clusterIP of the nats service we created before
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());


   
  } catch (err) {
    console.error(err);
  }
  
};

start();
