import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

console.log("here");

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("No env vars loaded");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("No env vars for mongo loaded");
  }
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
    console.log(process.env.NATS_CLIENT_ID);
    await natsWrapper.connect(
      "ticketing",
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    ); // clusterIP of the nats service we created before
    console.log(process.env.NATS_CLIENT_ID);
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed");
      process.exit();
    });
    //  console.log("here2");
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());
    await mongoose.connect(process.env.MONGO_URI); // clusterIP of the db service we created before
  } catch (err) {
    console.error(err);
  }
  //console.log("here3");
  app.listen(3000, () => {
    console.log("Listening on 3000");
  });
};

start();
