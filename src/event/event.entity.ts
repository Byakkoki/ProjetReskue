import {Cascade, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property} from "@mikro-orm/core";
import { User } from "../user/user.entity";
import {TicketEntity} from "../ticket/ticket.entity";

@Entity()
export class EventEntity {

    @PrimaryKey()
    id: string

    @Property()
    name: string

    @Property()
    start_date: Date

    @Property()
    place: string

    @ManyToOne(() => User)
    owner: User

    @OneToMany(() => TicketEntity, ticket => ticket.event, { cascade: [Cascade.ALL] })
    tickets = new Collection<TicketEntity>(this)
}