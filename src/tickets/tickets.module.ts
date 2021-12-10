import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StripeModule } from 'nestjs-stripe';

import { TicketsService } from './service/tickets.service';
import { Tickets, TicketsSchema } from './schemas/ticket.shema';
import {
  TicketsBoughtList,
  TicketsBoughtListSchema,
} from './schemas/ticket.Boughtlist.schema';
import { TicketsController } from './controller/ticket.controller';
import { SK } from '../config';

@Module({
  imports: [
    StripeModule.forRoot({
      apiKey: SK,
      apiVersion: '2020-08-27',
    }),
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
