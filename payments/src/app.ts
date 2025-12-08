import express from "express";
import { json } from "body-parser";
import { currentUser, errorHandler } from "@anjal_tickets/common";
import { NotFoundError } from "@anjal_tickets/common";
import cookieSession from "cookie-session";
import { createChargeRouter } from "./routes/new";

const app = express();
app.set("trust proxy", true); //traffic is sent to the app through ingress nginx
app.use(json());
app.use(
  cookieSession({
    signed: false, //disabling encryption
    secure: process.env.NODE_ENV !== "test", //cookies are sent only over https connection
  })
);

app.use(currentUser);
app.use(createChargeRouter)



app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
