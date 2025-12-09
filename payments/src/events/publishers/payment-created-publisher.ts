import { PaymentCreatedEvent, Publisher, Subjects } from "@anjal_tickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{


    subject: Subjects.PaymentCreated=Subjects.PaymentCreated

    
}