import { Body, Controller, Get, Logger, Post, Req, UseGuards } from "@nestjs/common";
import RequestWithUser from "src/commons/request.user";
import { AuthenticatedGuard } from "src/commons/security/guard/authenticated.guard";
import { AuthenticationService } from "./authentication.service";
import { LoginDTO } from "./dto/login.dto";
import { RegisterDTO } from "./dto/register.dto";

@Controller('authentication')
export class AuthenticationController {

    private logger: Logger = new Logger('AuthenticationController')

    constructor(
        private authenticationService: AuthenticationService
    ) { }

    @Post('register')
    register(@Body() data: RegisterDTO) {
        return this.authenticationService.register(data)
    }

    @Post('login')
    login(@Body() data: LoginDTO) {
        return this.authenticationService.login(data)
    }

    @UseGuards(AuthenticatedGuard)
    @Get('me')
    getAuthenticatedUser(@Req() request: RequestWithUser) {
        console.log(request)
        return request.user
    }
}