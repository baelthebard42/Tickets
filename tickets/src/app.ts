import express from "express";
import { json } from "body-parser";
import { currentUser, errorHandler } from "@anjal_tickets/common";
import { NotFoundError } from "@anjal_tickets/common";
import cookieSession from "cookie-session";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import "express-async-errors";
import { indexTicketRouter } from "./routes";
import { updateTicketRouter } from "./routes/update";

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

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
