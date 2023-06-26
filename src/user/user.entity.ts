import { Cascade, Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { RoleEnum } from "../commons/enum/role.enum";
import { EventEntity } from "../event/event.entity";
import {TicketEntity} from "../ticket/ticket.entity";

@Entity()
export class User {

    @PrimaryKey()
    id: string

    @Property()
    firstName: string

    @Property()
    lastName: string

    @Property({
        unique: true
    })
    email: string
    
    @Property({
        hidden: true
    })
    password: string

    @Property({})
    roles: RoleEnum[]

    @OneToMany(() => EventEntity, event => event.owner, { cascade: [Cascade.ALL] })
    events = new Collection<EventEntity>(this)

    @OneToMany(() => TicketEntity, ticket => ticket.owner, { cascade: [Cascade.ALL] })
    tickets = new Collection<TicketEntity>(this)
}