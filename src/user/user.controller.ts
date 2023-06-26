import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import RequestWithUser from "../commons/request.user";
import { AuthenticatedGuard } from "../commons/security/guard/authenticated.guard";
import { UpdateUserDTO } from "./dto/updateUser.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Get()
    findAll() {
        return this.userService.findAll()
    }

    @HttpCode(200)
    @UseGuards(AuthenticatedGuard)
    @Put('/:idUser')
    updateOneUser(@Body() data: UpdateUserDTO, @Req() request: RequestWithUser, @Param('idUser') id: string) {
        return this.userService.updateOneUser(request.user, id, data)
    }

    @HttpCode(204)
    @UseGuards(AuthenticatedGuard)
    @Delete('/:idUser')
    deleteOneUser(@Req() request: RequestWithUser, @Param('idUser') id: string) {
        return this.userService.deleteOneUser(request.user, id)
    }
}
