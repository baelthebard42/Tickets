import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("No env vars loaded");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("No env vars for mongo loaded");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI); // clusterIP of the db service we created before
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log("Listening on 3000");
  });
};

start();
