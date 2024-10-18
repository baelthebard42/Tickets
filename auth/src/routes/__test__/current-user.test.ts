import request from "supertest";
import { app } from "../../app";

it("responds with details about current user", async () => {
  const cookie = await signin();

  if (!cookie) {
    throw new Error("Cookie not set after signup");
  }

  const res = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(res.body.currentUser.email).toEqual("test@t.com");
});

it("responds with null if not signed in", async () => {
  const res = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(res.body.currentUser).toEqual(null);
});
