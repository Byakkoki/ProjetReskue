import {Controller, Get, Param, Post, Put, Req, UseGuards} from "@nestjs/common";
import {TicketService} from "./ticket.service";
import {AuthenticatedGuard} from "../commons/security/guard/authenticated.guard";
import RequestWithUser from "../commons/request.user";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TicketEntity } from "./ticket.entity";
import { User } from "src/user/user.entity";

@ApiTags('Ticket')
@Controller('ticket/event/:idEvent')
export class TicketController {

    constructor(
        private ticketService: TicketService
    ) { }

    @ApiOperation({
        description: `This route received all ticket`,
    })
    @ApiResponse({
        status: 200,
        description: 'You received all the user',
        type: [TicketEntity],
    })
    @ApiResponse({
        status: 401,
        description: 'You need to be identified with your token',
    })
    @UseGuards(AuthenticatedGuard)
    @Get()
    getAllTickets(@Req() request: RequestWithUser) {
        return this.ticketService.getAllTickets(request.user)
    }

    @ApiOperation({
        description: `This route received all available ticket of one event`,
    })
    @ApiResponse({
        status: 200,
        description: 'You received all the ticket available',
        type: [TicketEntity],
    })
    @ApiResponse({
        status: 401,
        description: 'You need to be identified with your token',
    })
    @Get('available')
    getAllTicketAvailableByOneEvent(@Param('idEvent') idEvent: string) {
        return this.ticketService.getAllTicketAvailableByOneEvent(idEvent)
    }

    @ApiOperation({
        description: `This route received a ticket with booked`,
    })
    @ApiResponse({
        status: 200,
        description: 'You received one ticket',
        type: [TicketEntity],
    })
    @ApiResponse({
        status: 401,
        description: 'You need to be identified with your token',
    })
    @UseGuards(AuthenticatedGuard)
    @Post('book')
    bookOneTicket(@Req() request: RequestWithUser, @Param('idEvent') id: string) {
        return this.ticketService.bookOneTicket(id, request.user)
    }

    @ApiOperation({
        description: `This route received a ticket with unbooked`,
    })
    @ApiResponse({
        status: 200,
        description: 'You received one ticket',
        type: [TicketEntity],
    })
    @ApiResponse({
        status: 401,
        description: 'You need to be identified with your token',
    })
    @UseGuards(AuthenticatedGuard)
    @Put('remove-book/:idTicket')
    removeOneBookForOneUser(@Param('idTicket') idTicket: string, @Param('idEvent') idEvent: string, @Req() request: RequestWithUser) {
        return this.ticketService.removeOneBookFromOneEvent(idEvent, idTicket, request.user)
    }
}