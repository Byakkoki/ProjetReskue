import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req, UseGuards} from "@nestjs/common";
import { AuthenticatedGuard } from "src/commons/security/guard/authenticated.guard";
import RequestWithUser from "../commons/request.user";
import { EventService } from "./event.service";
import {CreateEventDTO} from "./dto/createEvent.dto";
import {UpdateEventDTO} from "./dto/updateEvent.dto";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { EventEntity } from "./event.entity";

@ApiTags('Event')
@Controller('event')
export class EventController {

    constructor(
        private eventService: EventService
    ) { }

    @ApiOperation({
        description: `This route received all the event`,
    })
    @ApiResponse({
        status: 200,
        description: 'You received all the event',
        type: [EventEntity],
    })
    @ApiResponse({
        status: 401,
        description: 'You need to be identified with your token',
    })
    @Get()
    findAll() {
        return this.eventService.findAll()
    }

    @ApiOperation({
        description: `This route received one event`,
    })
    @ApiResponse({
        status: 200,
        description: 'You received one event',
        type: EventEntity,
    })
    @ApiResponse({
        status: 401,
        description: 'You need to be identified with your token',
    })
    @ApiResponse({
        status: 404,
        description: "The event can't be found",
    })
    @ApiParam({
        name: 'idEvent',
        required: true,
        description: 'Should be an id of one event that exists in the database',
        type: String
    })
    @Get('/:idEvent')
    findOneEvent(@Param('idEvent') id: string) {
        return this.eventService.findOneEvent(id)
    }

    @ApiOperation({
        description: `This route can create a event`,
    })
    @ApiResponse({
        status: 200,
        description: 'You create the event',
        type: EventEntity,
    })
    @ApiResponse({
        status: 400,
        description: 'Something is wrong with the data you send',
    })
    @ApiResponse({
        status: 401,
        description: 'You need to be identified with your token',
    })
    @UseGuards(AuthenticatedGuard)
    @Post()
    createOneEvent(@Body() data: CreateEventDTO, @Req() request: RequestWithUser) {
        return this.eventService.createOneEvent(data, request.user)
    }

    @ApiOperation({
        description: `This route can update a event`,
    })
    @ApiResponse({
        status: 200,
        description: 'You update the event',
        type: EventEntity,
    })
    @ApiResponse({
        status: 400,
        description: 'Something is wrong with the data you send',
    })
    @ApiResponse({
        status: 401,
        description: 'You need to be identified with your token',
    })
    @ApiResponse({
        status: 403,
        description: "The event is not your",
    })
    @ApiResponse({
        status: 404,
        description: "The event can't be found",
    })
    @ApiParam({
        name: 'idEvent',
        required: true,
        description: 'Should be an id of one event that exists in the database',
        type: String
    })
    @UseGuards(AuthenticatedGuard)
    @HttpCode(200)
    @Put('/:idEvent')
    updateOneEvent(@Param('idEvent') id: string, @Body() data: UpdateEventDTO, @Req() request: RequestWithUser) {
        return this.eventService.updateOneEvent(id, data, request.user)
    }

    @ApiOperation({
        description: `This route can update a event`,
    })
    @ApiResponse({
        status: 204,
        description: 'You deleted the event',
    })
    @ApiResponse({
        status: 401,
        description: 'You need to be identified with your token',
    })
    @ApiResponse({
        status: 403,
        description: "The event is not your",
    })
    @ApiResponse({
        status: 404,
        description: "The event can't be found",
    })
    @ApiParam({
        name: 'idEvent',
        required: true,
        description: 'Should be an id of one event that exists in the database',
        type: String
    })
    @HttpCode(204)
    @UseGuards(AuthenticatedGuard)
    @Delete('/:idEvent')
    deleteOneEvent(@Param('idEvent') id: string, @Req() request: RequestWithUser) {
        return this.eventService.deleteOneEvent(id, request.user)
    }
}