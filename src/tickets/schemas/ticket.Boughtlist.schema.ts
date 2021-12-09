import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TicketsBoughtListDocument = TicketsBoughtList & Document;

@Schema()
export class TicketsBoughtList {
  @Prop() price: number;
  @Prop() token: string;
  @Prop() date: number;
}

export const TicketsBoughtListSchema =
  SchemaFactory.createForClass(TicketsBoughtList);
