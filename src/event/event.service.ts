import {InjectRepository} from "@mikro-orm/nestjs";
import {EntityManager, EntityRepository} from "@mikro-orm/postgresql";
import {ForbiddenException, Injectable, NotFoundException} from "@nestjs/common";
import {User} from "../user/user.entity";
import {v4} from "uuid";
import {EventEntity} from "./event.entity";
import {RoleEnum} from "../commons/enum/role.enum";
import {CreateEventDTO} from "./dto/createEvent.dto";
import {UpdateEventDTO} from "./dto/updateEvent.dto";
import {wrap} from "@mikro-orm/core";
import {UserService} from "../user/user.service";
import {TicketEntity} from "../ticket/ticket.entity";

@Injectable()
export class EventService {

    constructor(
        @InjectRepository(EventEntity)
        private eventRepository: EntityRepository<EventEntity>,
        @InjectRepository(TicketEntity)
        private ticketEntity: EntityRepository<TicketEntity>,
        private entityManager: EntityManager,
        private userService: UserService,
    ) { }

    findAll() {
        return this.eventRepository.findAll({populate: ["owner"]})
    }

    async findOneEvent(idEvent: string) {
        const event = await this.eventRepository.findOne({
            id: idEvent
        }, {populate: ['owner']})
        if(!event) {
            throw new NotFoundException('Event not found')
        }
        return event
    }

    async findAllEventByOneOwner(idUser: string) {
        const user = await this.userService.findOneUser(idUser)
        return this.eventRepository.find({
            owner: user
        })
    }

    async findOneEventWithOwner(idEvent: string, user: User) {
        const event = await this.eventRepository.findOne({
            id: idEvent
        })
        if(!event) {
            throw new NotFoundException('Event not found')
        }

        if(user.roles.includes(RoleEnum.ADMIN)) {
            return event
        }

        if(event.owner != user) {
            throw new ForbiddenException('This event is not your')
        }

        return event
    }

    async createOneEvent(data: CreateEventDTO, user: User) {
        let numberTicket = 0
        let tabTicket = []
        const newEvent = await this.eventRepository.create({
            id: v4(),
            ...data,
            owner: user
        })

        if(data.numberTicket == undefined) {
            numberTicket = 20
        } else {
            numberTicket = data.numberTicket
        }

        for(let i = 1; i <= numberTicket; i++) {
            const newTicket = await this.ticketEntity.create({
                id: v4(),
                owner: null,
                event: newEvent
            })
            tabTicket.push(newTicket)
            await this.entityManager.persistAndFlush(newTicket)
        }

        await this.entityManager.persistAndFlush(newEvent)
        const findEvent = await this.eventRepository.findOne({
            id: newEvent.id
        }, { populate: ['owner'] })
        findEvent.tickets = undefined
        return findEvent
    }

    async updateOneEvent(idEvent: string, data: UpdateEventDTO, user: User) {
        const eventUpdate = await this.findOneEventWithOwner(idEvent, user)
        wrap(eventUpdate).assign(data)
        await this.entityManager.persistAndFlush(eventUpdate);
        return eventUpdate;
    }

    async deleteOneEvent(idEvent: string, user: User) {
        const eventDelete = await this.findOneEventWithOwner(idEvent, user)
        const tickets = await this.ticketEntity.find({
            event: eventDelete
        })
        tickets.forEach(async (ticket) => {
            await this.entityManager.removeAndFlush(ticket)
        })
        return this.entityManager.removeAndFlush(eventDelete)
    }
}