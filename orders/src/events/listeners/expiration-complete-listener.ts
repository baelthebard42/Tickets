import { ExpirationCompleteEvent, Listener, OrderStatus, Subjects } from "@anjal_tickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent>{

    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete

queueGroupName = queueGroupName 

async onMessage(data: ExpirationCompleteEvent['data'], msg: Message){

    const order = await Order.findById(data.orderId).populate('ticket')
  // console.log("Expired event received for order ", data.orderId)
if (!order) {
    throw new Error("Order not found")
}

if (order.status === OrderStatus.Complete){
    return msg.ack()
}

order.set({
    status: OrderStatus.Cancelled,
    //ticket: null-> not necessary since ticket will be unreserved automatically once we set orderstatus to cancelled (see code for isReserved)
})

await order.save()

await new OrderCancelledPublisher(this.client).publish({
    id: order.id, 
    version: order.version,
    ticket: {
        id: order.ticket.id
    }
})


msg.ack()

}




}