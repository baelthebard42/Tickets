import request from "supertest";
import { app } from "../../app";

it("returns a 201 on sucessful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("returns a 405 for invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "aa",
      password: "password",
    })
    .expect(405);
});

it("returns a 405 for missing email/password", async () => {
  return request(app).post("/api/users/signup").send({}).expect(405);
});

it("doesnt allow duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "anjal@anjal.com",
      password: "anjal",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "anjal@anjal.com",
      password: "anjal",
    })
    .expect(400);
});

it("sets a cookie after sucessful signup", async () => {
  const res = await request(app).post("/api/users/signup").send({
    email: "anjal@anjal.com",
    password: "anjal",
  });

  expect(res.get("Set-Cookie")).toBeDefined();
});
