import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req, UseGuards} from "@nestjs/common";
import { AuthenticatedGuard } from "src/commons/security/guard/authenticated.guard";
import RequestWithUser from "../commons/request.user";
import { EventService } from "./event.service";
import {CreateEventDTO} from "./dto/createEvent.dto";
import {UpdateEventDTO} from "./dto/updateEvent.dto";

@Controller('event')
export class EventController {

    constructor(
        private eventService: EventService
    ) { }

    @Get()
    findAll() {
        return this.eventService.findAll()
    }

    @Get('/:idEvent')
    findOneEvent(@Param('idEvent') id: string) {
        return this.eventService.findOneEvent(id)
    }

    @UseGuards(AuthenticatedGuard)
    @Post()
    createOneEvent(@Body() data: CreateEventDTO, @Req() request: RequestWithUser) {
        return this.eventService.createOneEvent(data, request.user)
    }

    @UseGuards(AuthenticatedGuard)
    @HttpCode(200)
    @Put('/:idEvent')
    updateOneEvent(@Param('idEvent') id: string, @Body() data: UpdateEventDTO, @Req() request: RequestWithUser) {
        return this.eventService.updateOneEvent(id, data, request.user)
    }

    @HttpCode(204)
    @UseGuards(AuthenticatedGuard)
    @Delete('/:idEvent')
    deleteOneEvent(@Param('idEvent') id: string, @Req() request: RequestWithUser) {
        return this.eventService.deleteOneEvent(id, request.user)
    }
}