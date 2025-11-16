export class TicketPurchasedDto {
  transactionId: string;
  userId: string;
  flightNumber: number;
  day: Date | string;
  value: number;
  timestamp: Date;
}

