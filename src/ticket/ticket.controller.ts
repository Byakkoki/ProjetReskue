import {Controller, Get, Param, Post, Put, Req, UseGuards} from "@nestjs/common";
import {TicketService} from "./ticket.service";
import {AuthenticatedGuard} from "../commons/security/guard/authenticated.guard";
import RequestWithUser from "../commons/request.user";

@Controller('ticket/event/:idEvent')
export class TicketController {

    constructor(
        private ticketService: TicketService
    ) { }

    @Get('available')
    getAllTicketAvailableByOneEvent(@Param('idEvent') idEvent: string) {
        return this.ticketService.getAllTicketAvailableByOneEvent(idEvent)
    }

    @UseGuards(AuthenticatedGuard)
    @Post('book')
    bookOneTicket(@Req() request: RequestWithUser, @Param('idEvent') id: string) {
        return this.ticketService.bookOneTicket(id, request.user)
    }

    @UseGuards(AuthenticatedGuard)
    @Put('remove-book/:idTicket')
    removeOneBookForOneUser(@Param('idTicket') idTicket: string, @Param('idEvent') idEvent: string, @Req() request: RequestWithUser) {
        return this.ticketService.removeOneBookFromOneEvent(idEvent, idTicket, request.user)
    }
}