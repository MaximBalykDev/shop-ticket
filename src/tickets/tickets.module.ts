import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TicketsService } from './service/tickets.service';
import { Tickets, TicketsSchema } from './schemas/ticket.shema';
import {
  TicketsBoughtList,
  TicketsBoughtListSchema,
} from './schemas/ticket.Boughtlist.schema';
import { StripeModule } from 'nestjs-stripe';
import { TicketsController } from './controller/ticket.controller';

@Module({
  imports: [
    StripeModule,
    MongooseModule.forFeature([
      { name: Tickets.name, schema: TicketsSchema, collection: 'tikets' },
      {
        name: TicketsBoughtList.name,
        schema: TicketsBoughtListSchema,
        collection: 'ticketsBoughtList',
      },
    ]),
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
