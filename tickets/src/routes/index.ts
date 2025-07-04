import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@anjal_tickets/common";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets", async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});
  res.send(tickets);
});

export { router as indexTicketRouter };
