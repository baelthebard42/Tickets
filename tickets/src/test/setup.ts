import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";

declare global {
  //augmenting the global namespace to fit signin function
  var signin: () => Promise<string[]>; //i.e returns an array of strings after promise is resolved
}

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

global.signin = async () => {
  const email = "test@t.com";
  const password = "password";

  const res = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = res.get("Set-Cookie");
  if (!cookie) {
    throw new Error("Failed to get cookie from response");
  }
  return cookie;
};
