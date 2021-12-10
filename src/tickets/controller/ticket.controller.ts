import { Body, Controller, Get, Post } from '@nestjs/common';
import { HydratedDocument } from 'mongoose';

import { TicketsService } from '../service/tickets.service';
import { PaymentInterface } from '../interfaces/ticket.interface';
import { TicketsDocument } from '../schemas/ticket.shema';
import { TicketsBoughtListDocument } from '../schemas/ticket.Boughtlist.schema';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  getTicketsList(): Promise<Array<HydratedDocument<TicketsDocument>>> {
    return this.ticketsService.getTicketsList();
  }

  @Get('all')
  getBoughtTicketsList(): Promise<
    Array<HydratedDocument<TicketsBoughtListDocument>>
  > {
    return this.ticketsService.getBoughtTicketsList();
  }

  @Post('buy')
  buyTicket(
    @Body() data: { token: string; amount: number; id: string },
  ): Promise<PaymentInterface> {
    return this.ticketsService.buyTicket(data.token, data.amount, data.id);
  }
}
