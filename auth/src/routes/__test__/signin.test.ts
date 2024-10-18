import request from "supertest";
import { app } from "../../app";

it("fails when a email doesnt exist", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});
