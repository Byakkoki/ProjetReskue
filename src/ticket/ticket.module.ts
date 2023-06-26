import {Module} from "@nestjs/common";
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {EventEntity} from "../event/event.entity";
import {User} from "../user/user.entity";
import {ConfigModule} from "@nestjs/config";
import {TicketEntity} from "./ticket.entity";
import {TicketController} from "./ticket.controller";
import {TicketService} from "./ticket.service";

@Module({
    imports: [
        MikroOrmModule.forFeature([EventEntity, User, TicketEntity]),
        ConfigModule
    ],
    controllers: [TicketController],
    providers: [TicketService],
    exports: [TicketService]
})
export class TicketModule { }