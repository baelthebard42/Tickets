import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

let mongo: any;
beforeAll(async () => {
  //before any test has run
  process.env.JWT_KEY = "asdf";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  //before each test
  const collections = await mongoose.connection.db?.collections();

  for (let collection of collections!) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  //after all tests have completed
  await mongo.stop();
  await mongoose.connection.close();
});
