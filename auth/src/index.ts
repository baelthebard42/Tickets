import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("No env vars loaded");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth"); // clusterIP of the db service we created before
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log("Listening on 3000");
  });
};

start();
