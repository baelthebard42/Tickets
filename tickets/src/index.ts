import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("No env vars loaded");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("No env vars for mongo loaded");
  }
  try {
    await natsWrapper.connect("ticketing", "asdf", "http://nats-srv:4222"); // clusterIP of the nats service we created before
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());
    await mongoose.connect(process.env.MONGO_URI); // clusterIP of the db service we created before
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log("Listening on 3000");
  });
};

start();
