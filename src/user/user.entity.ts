import { Cascade, Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { RoleEnum } from "../commons/enum/role.enum";
import { EventEntity } from "../event/event.entity";
import {TicketEntity} from "../ticket/ticket.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {

    @ApiProperty({
        name: 'id',
        description: 'The id of the user',
        example: '20ee542c-4416-49f9-ae99-d4106de3a018'
    })
    @PrimaryKey()
    id: string

    @ApiProperty({
        name: 'firstName',
        description: 'The firstName of the user',
        example: 'Jordan'
    })
    @Property()
    firstName: string

    @ApiProperty({
        name: 'lastName',
        description: 'The lastName of the user',
        example: 'PICANT'
    })
    @Property()
    lastName: string

    @ApiProperty({
        name: 'email',
        description: 'The email of the user',
        example: 'jordan.picant.14@gmail.com'
    })
    @Property({
        unique: true
    })
    email: string
    
    @ApiProperty({
        name: 'password',
        description: 'The password of the user',
        example: 'unbeaumdp'
    })
    @Property({
        hidden: true
    })
    password: string

    @ApiProperty({
        name: 'roles',
        description: 'The roles of the user',
        examples: [
            "USER",
            "ADMIN"
        ]
    })
    @Property({})
    roles: RoleEnum[]

    @OneToMany(() => EventEntity, event => event.owner, { cascade: [Cascade.ALL] })
    events = new Collection<EventEntity>(this)

    @OneToMany(() => TicketEntity, ticket => ticket.owner, { cascade: [Cascade.ALL] })
    tickets = new Collection<TicketEntity>(this)
}