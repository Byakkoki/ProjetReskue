import { Body, Controller, Get, Logger, Post, Req, UseGuards } from "@nestjs/common";
import RequestWithUser from "../commons/request.user";
import { AuthenticatedGuard } from "../commons/security/guard/authenticated.guard";
import { AuthenticationService } from "./authentication.service";
import { LoginDTO } from "./dto/login.dto";
import { RegisterDTO } from "./dto/register.dto";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "src/user/user.entity";

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {

    private logger: Logger = new Logger('AuthenticationController')

    constructor(
        private authenticationService: AuthenticationService
    ) { }

    @ApiOperation({
        description: `This route can create a user`,
    })
    @ApiResponse({
        status: 200,
        description: 'The user has been created',
        type: User,
    })
    @ApiResponse({
        status: 401,
        description: 'You need to be identified with your token',
    })
    @Post('register')
    register(@Body() data: RegisterDTO) {
        return this.authenticationService.register(data)
    }

    @ApiOperation({
        description: `This route can login the user`,
    })
    @ApiResponse({
        status: 200,
        description: 'You receive the user and Token',
        type: User,
    })
    @ApiResponse({
        status: 400,
        description: 'Something is wrong with the data you send',
    })
    @ApiResponse({
        status: 404,
        description: "The user with this email was not found or password not the same",
    })
    @Post('login')
    login(@Body() data: LoginDTO) {
        return this.authenticationService.login(data)
    }

    @ApiOperation({
        description: `This route can get the user logged`,
    })
    @ApiResponse({
        status: 200,
        description: 'You receive the user',
        type: User,
    })
    @ApiResponse({
        status: 400,
        description: 'Something is wrong with the data you send',
    })
    @ApiResponse({
        status: 404,
        description: "The user with this email was not found or password not the same",
    })
    @UseGuards(AuthenticatedGuard)
    @Get('me')
    getAuthenticatedUser(@Req() request: RequestWithUser) {
        return request.user
    }
}