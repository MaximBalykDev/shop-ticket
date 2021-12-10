import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Stripe } from 'stripe';
import { InjectModel } from '@nestjs/mongoose';
import { InjectStripe } from 'nestjs-stripe';

import { Tickets, TicketsDocument } from '../schemas/ticket.shema';
import {
  TicketsBoughtList,
  TicketsBoughtListDocument,
} from '../schemas/ticket.Boughtlist.schema';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Tickets.name)
    private ticketsModel: Model<TicketsDocument>,
    @InjectModel(TicketsBoughtList.name)
    private ticketsBoughtListModel: Model<TicketsBoughtListDocument>,
    @InjectStripe() private readonly stripeClient: Stripe,
  ) {}

  getTicketsList(): Promise<any> {
    return this.ticketsModel.find().exec();
  }

  getBoughtTicketsList(): Promise<any> {
    return this.ticketsBoughtListModel.find().exec();
  }

  public async buyTicket(token: string, amount: number, id: string) {
    const session = await this.stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'name',
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:4200/',
      cancel_url: 'http://localhost:4200/',
    });

    await this.ticketsBoughtListModel.create({
      token,
      price: amount,
      date: new Date().getTime(),
      id: id,
    });

    return { id: (session as unknown as { id: string }).id };
  }
}
