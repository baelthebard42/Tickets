import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from "@anjal_tickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
