import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signing";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import cookieSession from "cookie-session";

const app = express();
app.set("trust proxy", true); //traffic is sent to the app through ingress nginx
app.use(json());
app.use(
  cookieSession({
    signed: false, //disabling encryption
    secure: true, //cookies are sent only over https connection
  })
);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
