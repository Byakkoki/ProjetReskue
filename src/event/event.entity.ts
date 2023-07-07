import {Cascade, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property} from "@mikro-orm/core";
import { User } from "../user/user.entity";
import {TicketEntity} from "../ticket/ticket.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class EventEntity {

    @ApiProperty({
        name: 'id',
        description: 'The id of the event',
        example: '4cc7d697-9202-4856-bb97-ddd64d16f8f6'
    })
    @PrimaryKey()
    id: string

    @ApiProperty({
        name: 'name',
        description: 'The name of the event',
        example: 'NameOfTheEvent'
    })
    @Property()
    name: string

    @ApiProperty({
        name: 'start_date',
        description: 'The start_date of the event',
        example: '2023-06-26T12:13:47+0000'
    })
    @Property()
    start_date: string

    @ApiProperty({
        name: 'place',
        description: 'The place of the event',
        example: 'CAEN'
    })
    @Property()
    place: string

    @ManyToOne(() => User, { cascade: [Cascade.ALL] })
    owner: User

    @OneToMany(() => TicketEntity, ticket => ticket.event, { cascade: [Cascade.ALL] })
    tickets = new Collection<TicketEntity>(this)
}