import { Publisher, OrderCreatedEvent, Subjects } from "@anjal_tickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
