import { Body, Controller, Get, Post } from '@nestjs/common';

import { TicketsService } from '../service/tickets.service';
import {
  PaymentInterface,
  TicketInterface,
} from '../interfaces/ticket.interface';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  getTicketsList(): Promise<TicketInterface[]> {
    return this.ticketsService.getTicketsList();
  }

  @Get('all')
  getBoughtTicketsList(): Promise<TicketInterface[]> {
    return this.ticketsService.getBoughtTicketsList();
  }

  @Post('buy')
  buyTicket(
    @Body() data: { token: string; amount: number; id: string },
  ): Promise<PaymentInterface> {
    return this.ticketsService.buyTicket(data.token, data.amount, data.id);
  }
}
