import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthenticatedStrategy } from "src/commons/security/strategy/authenticated.strategy";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { EventController } from "./event.controller";
import { EventEntity } from "./event.entity";
import { EventService } from "./event.service";
import {TicketEntity} from "../ticket/ticket.entity";

@Module({
    imports: [
        MikroOrmModule.forFeature([EventEntity, User, TicketEntity]),
        ConfigModule
    ],
    controllers: [EventController],
    providers: [EventService, AuthenticatedStrategy, UserService],
    exports: [EventService]
})
export class EventModule { }