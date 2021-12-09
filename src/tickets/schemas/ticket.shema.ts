import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TicketsDocument = Tickets & Document;

@Schema()
export class Tickets {
  @Prop() id: string;
  @Prop() name: string;
  @Prop() cost: number;
}

export const TicketsSchema = SchemaFactory.createForClass(Tickets);
