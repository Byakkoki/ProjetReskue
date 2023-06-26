import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException
} from "@nestjs/common";
import {InjectRepository} from "@mikro-orm/nestjs";
import {TicketEntity} from "./ticket.entity";
import {EntityManager, EntityRepository} from "@mikro-orm/postgresql";
import {EventEntity} from "../event/event.entity";
import {User} from "../user/user.entity";
import e from "express";
import * as moment from "moment";

@Injectable()
export class TicketService {

    constructor(
        @InjectRepository(TicketEntity)
        private ticketRepository: EntityRepository<TicketEntity>,
        @InjectRepository(EventEntity)
        private eventRepository: EntityRepository<EventEntity>,
        private entityManager: EntityManager
    ) { }

    async getOneEvent(idEvent: string) {
        const event = await this.eventRepository.findOne({
            id: idEvent
        })

        if(!event) {
            throw new NotFoundException('Event not found')
        }

        return event
    }

    async getAllTicketAvailableByOneEvent(idEvent: string) {
        let tabAvailable = []
        let tabUnavailable = []
        const event = await this.getOneEvent(idEvent)

        const allTickets = await this.ticketRepository.find({
            event: event
        })

        for(const ticket of allTickets) {
            if(ticket.owner == null) {
                tabAvailable.push(ticket)
            } else {
                tabUnavailable.push(ticket)
            }
        }

        return {
            available: tabAvailable.length,
            unavailable: tabUnavailable.length
        }
    }

    async bookOneTicket(idEvent: string, user: User) {
        const dateNow = moment()
        let ticketSend: TicketEntity = null

        const event = await this.getOneEvent(idEvent)

        if(moment(dateNow).isAfter(moment(event.start_date))) {
            throw new BadRequestException('You can\'t book this ticket because the start date event has passed')
        }

        if(event.owner == user) {
            throw new ForbiddenException('You can book a ticket from your event')
        }

        const allTickets = await this.ticketRepository.find({
            event: event
        })
        const availableTicket = await this.getAllTicketAvailableByOneEvent(idEvent)

        if(allTickets.length == availableTicket.unavailable) {
            throw new BadRequestException('There is no one ticket available for this event')
        }

        for(const ticket of allTickets) {
            if(ticket.owner == user) {
                throw new ConflictException('You have already book a ticket for this event')
            }

            ticketSend = ticket
        }

        ticketSend.owner = user
        await this.entityManager.persistAndFlush(ticketSend)
        return ticketSend
    }
    
    async removeOneBookFromOneEvent(idEvent: string, idTicket: string, user: User) {
        const event = await this.getOneEvent(idEvent)
        const ticket = await this.ticketRepository.findOne({
            id: idTicket,
            event: event,
            owner: user
        })

        if(!ticket) {
            throw new NotFoundException('Ticket not found')
        }

        ticket.owner = null
        await this.entityManager.persistAndFlush(ticket)
        return ticket
    }
}