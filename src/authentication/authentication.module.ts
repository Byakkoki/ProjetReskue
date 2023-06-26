import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthenticatedStrategy } from "../commons/security/strategy/authenticated.strategy";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";

@Module({
    imports: [
        MikroOrmModule.forFeature([User]),
        ConfigModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}`,
                },
            }),
        }),
    ],
    controllers: [AuthenticationController],
    providers: [AuthenticationService, AuthenticatedStrategy, UserService],
    exports: [AuthenticationService, UserService]
})
export class AuthenticationModule { }