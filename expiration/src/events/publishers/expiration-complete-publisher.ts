import { ExpirationCompleteEvent, Publisher, Subjects } from "@anjal_tickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{

    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete
}