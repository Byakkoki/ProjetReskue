import {Cascade, Entity, ManyToOne, PrimaryKey} from "@mikro-orm/core";
import {User} from "../user/user.entity";
import {EventEntity} from "../event/event.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class TicketEntity {

    @ApiProperty({
        name: 'id',
        description: 'The id of the Ticker',
        example: '20ee542c-4416-49f9-ae99-d4106de3a018'
    })
    @PrimaryKey()
    id: string

    @ApiProperty({
        name: 'id',
        description: 'The id of the user',
        example: '20ee542c-4416-49f9-ae99-d4106de3a018'
    })
    @ManyToOne(() => User, { nullable: true, cascade: [Cascade.ALL] })
    owner: User

    @ApiProperty({
        name: 'id',
        description: 'The id of the event',
        example: '20ee542c-4416-49f9-ae99-d4106de3a018'
    })
    @ManyToOne(() => EventEntity, { cascade: [ Cascade.ALL] })
    event: EventEntity
}