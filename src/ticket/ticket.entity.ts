import {Entity, ManyToOne, PrimaryKey} from "@mikro-orm/core";
import {User} from "../user/user.entity";
import {EventEntity} from "../event/event.entity";

@Entity()
export class TicketEntity {
    @PrimaryKey()
    id: string

    @ManyToOne(() => User, { nullable: true })
    owner: User

    @ManyToOne(() => EventEntity)
    event: EventEntity
}