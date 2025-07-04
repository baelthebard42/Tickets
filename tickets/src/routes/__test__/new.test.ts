import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper"; //still gives the fake wrapper from the mock

it("has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.statusCode).not.toEqual(404);
});

it("can only be accessed if the user is signed in ", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("returns status other than 401 if the user is signed in ", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});

  //console.log(response.statusCode)
  expect(response.statusCode).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      price: 10,
    })
    .expect(405);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "",
      price: 10,
    })
    .expect(405);
});

it("returns an error if an invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "fff",
      price: -10,
    })
    .expect(405);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "fff",
    })
    .expect(405);
});

it("creates a ticket with valid parameters", async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "test",
      price: 10,
    })
    .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
});

it("publishes an event", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "test",
      price: 10,
    })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
