import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TicketsModule } from './tickets/tickets.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

const uri =
  'mongodb+srv://admin:ctrezzwVdRG9MLbQ@cluster0.b0u8v.mongodb.net/ticketsDB?retryWrites=true&w=majority';

@Module({
  imports: [TicketsModule, MongooseModule.forRoot(uri)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
