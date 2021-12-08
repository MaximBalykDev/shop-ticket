import { Body, Controller, Get, Post } from "@nestjs/common";
import { TicketsService } from "../service/tickets.service";

@Controller("tickets")
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {
    }


    @Get()
    getTicketsList(): Promise<any> {
        return this.ticketsService.getTicketsList();
    }

    @Get('all')
    getBoughtTicketsList(): Promise<any> {
        return this.ticketsService.getBoughtTicketsList();
    }

    @Post('buy')
    buyTicket(@Body() data: { token: string, amount: number, id: string }): Promise<any> {
        return this.ticketsService.buyTicket(data.token, data.amount, data.id);
    }
}