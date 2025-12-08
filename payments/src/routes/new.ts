import { body, ExpressValidator } from "express-validator";
import express, { Request, Response } from "express";
import { BadRequestError, NotAuthorizedError, NotFoundError, OrderStatus, requireAuth, validateRequest } from "@anjal_tickets/common";
import { Order } from "../models/order";
import { NotBeforeError } from "jsonwebtoken";
import { stripe } from "../stripe";
 

 const router = express.Router()

 router.post('/api/payments', requireAuth,  [
    body('token').not().isEmpty(),
    body('orderId').not().isEmpty()
 ], validateRequest,

 async (req: Request, res: Response) => {
   
    const {token, orderId} = req.body

    const order = await Order.findById(orderId)

    if (!order) {
        throw new NotFoundError()
    }

    if (order.userId !== req.currentUser!.id){
        throw new NotAuthorizedError()
    }

    if (order.status === OrderStatus.Cancelled){
        throw new BadRequestError("The order is already cancelled")
    }

    await stripe.charges.create({
        currency: 'usd',
        amount: order.price * 100,
        source: token
    })

    res.send({success: true})

    
  }

)

export {router as createChargeRouter}

