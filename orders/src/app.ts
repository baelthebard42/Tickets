import express from "express";
import { json } from "body-parser";
import { currentUser, errorHandler } from "@anjal_tickets/common";
import { NotFoundError } from "@anjal_tickets/common";
import cookieSession from "cookie-session";
import { newOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";
import { indexOrderRouter } from "./routes";
import { deleteOrderRouter } from "./routes/delete";

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

app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
