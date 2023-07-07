import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import RequestWithUser from "../commons/request.user";
import { AuthenticatedGuard } from "../commons/security/guard/authenticated.guard";
import { UpdateUserDTO } from "./dto/updateUser.dto";
import { UserService } from "./user.service";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./user.entity";

@ApiTags('User')
@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @ApiOperation({
        description: `This route received a user`,
    })
    @ApiResponse({
        status: 200,
        description: 'You received all the user',
        type: [User],
    })
    @ApiResponse({
        status: 401,
        description: 'You need to be identified with your token',
    })
    @Get()
    findAll() {
        return this.userService.findAll()
    }

    @ApiOperation({
        description: `This route update a user`,
    })
    @ApiResponse({
        status: 201,
        description: 'The user has been updated',
        type: User,
    })
    @ApiResponse({
        status: 400,
        description: 'Something is wrong with the data you send',
    })
    @ApiResponse({
        status: 401,
        description: 'You need to be identified with your token',
    })
    @ApiResponse({
        status: 403,
        description: "You can't make that !",
    })
    @ApiResponse({
        status: 404,
        description: "The user can't be found",
    })
    @ApiParam({
        name: 'idUser',
        required: true,
        description: 'Should be an id of one user that exists in the database',
        type: String
    })
    @HttpCode(200)
    @UseGuards(AuthenticatedGuard)
    @Put('/:idUser')
    updateOneUser(@Body() data: UpdateUserDTO, @Req() request: RequestWithUser, @Param('idUser') id: string) {
        return this.userService.updateOneUser(request.user, id, data)
    }

    @ApiOperation({
        description: `This route delete a user`,
    })
    @ApiResponse({
        status: 204,
        description: 'The user has been deleted',
    })
    @ApiResponse({
        status: 401,
        description: 'You need to be identified with your token',
    })
    @ApiResponse({
        status: 403,
        description: "You can't make that !",
    })
    @ApiResponse({
        status: 404,
        description: "The user can't be found",
    })
    @ApiParam({
        name: 'idUser',
        required: true,
        description: 'Should be an id of one user that exists in the database',
        type: String
    })
    @HttpCode(204)
    @UseGuards(AuthenticatedGuard)
    @Delete('/:idUser')
    deleteOneUser(@Req() request: RequestWithUser, @Param('idUser') id: string) {
        return this.userService.deleteOneUser(request.user, id)
    }
}
