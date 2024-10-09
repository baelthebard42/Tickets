import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../models/User";
import { BadRequestError } from "../errors/badrequesterror";
import jwt from "jsonwebtoken";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),

    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Pass between 4 and 20"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log("Alreaady makde");
        throw new BadRequestError("Email already in use");
      }

      const user = User.build({ email, password });
      await user.save();

      const userJwt = jwt.sign(
        {
          // generating jwt to log user in after signup
          id: user.id,
          email: user.email,
        },
        process.env.JWT_KEY!
      );

      req.session = {
        jwt: userJwt,
      };

      res
        .status(201)
        .send({ message: "User account creation sucessful", user: user });
    } catch (err) {
      next(err);
    }
  }
);

export { router as signupRouter };
