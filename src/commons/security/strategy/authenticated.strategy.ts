import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../../user/user.service';
import { UserTokenPayload } from '../../../authentication/dto/payload';

@Injectable()
export class AuthenticatedStrategy extends PassportStrategy(Strategy, 'authenticated') {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET')
        })
    }

    async validate(payload: UserTokenPayload) {
        return this.userService.findOneUser(payload.idUser);
    }
}