import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthenticatedStrategy } from "../commons/security/strategy/authenticated.strategy";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Module({
    imports: [
        MikroOrmModule.forFeature([User]),
        ConfigModule
    ],
    controllers: [UserController],
    providers: [UserService, AuthenticatedStrategy],
    exports: [UserService]
})
export class UserModule { }