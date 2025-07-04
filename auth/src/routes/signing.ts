import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { validateRequest } from "@anjal_tickets/common";
import { User } from "../models/User";
import { BadRequestError } from "@anjal_tickets/common";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),

    body("password").trim().notEmpty().withMessage("Must supply a password"),
  ],
  validateRequest,

  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const isCorrectPassword = await Password.compare(
      existingUser.password,
      password
    );

    if (!isCorrectPassword) {
      throw new BadRequestError("Invalid credentials");
    }

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
