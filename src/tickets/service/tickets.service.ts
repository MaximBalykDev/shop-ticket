import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import * as Stripe from "stripe";

import { InjectModel } from "@nestjs/mongoose";
import { Tickets, TicketsDocument } from "../schemas/ticket.shema";
import { TicketsBoughtList, TicketsBoughtListDocument } from "../schemas/ticket.Boughtlist.schema";
import { SK } from "../../config";

@Injectable()
export class TicketsService {
    // @ts-ignore
    private stripe: Stripe = new Stripe(SK, {
        apiVersion: '2020-08-27'
    });

    constructor(
        @InjectModel(Tickets.name)
        private ticketsModel: Model<TicketsDocument>,
        @InjectModel(TicketsBoughtList.name)
        private ticketsBoughtListModel: Model<TicketsBoughtListDocument>
    ) {  }

    getTicketsList(): Promise<any> {
        return this.ticketsModel.find().exec();
      }

    getBoughtTicketsList(): Promise<any> {
        return this.ticketsBoughtListModel.find().exec();
    }


    buyTicket(token: string, amount: number, id: string): Promise<any> {
        return new Promise<any>((resolve) => {
            this.stripe.charges.create({
                amount: amount,
                currency: "USD",
                description: "Ticket payment",
                source: token
            }, (err) => {
                if (err) {
                    resolve({ success: false, status: err.raw.message });
                } else {
                    this.ticketsBoughtListModel.create({ token, price: amount, date: new Date().getTime(), id: id });
                    resolve({ success: true, status: "Payment Successful" });
                }
            });
        });
    }
}