import express, { Request, Response } from "express";
import {
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@anjal_tickets/common";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  console.log("id:", req.params.id);
  const ticket = await Ticket.findById(req.params.id);

  console.log("ticket:", ticket);

  if (!ticket) {
    throw new NotFoundError();
  }

  res.send(ticket);
});

export { router as showTicketRouter };
