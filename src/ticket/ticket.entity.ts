import {Cascade, Entity, ManyToOne, PrimaryKey} from "@mikro-orm/core";
import {User} from "../user/user.entity";
import {EventEntity} from "../event/event.entity";

@Entity()
export class TicketEntity {
    @PrimaryKey()
    id: string

    @ManyToOne(() => User, { nullable: true, cascade: [Cascade.ALL] })
    owner: User

    @ManyToOne(() => EventEntity, { cascade: [ Cascade.ALL] })
    event: EventEntity
}