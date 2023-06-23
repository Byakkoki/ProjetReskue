import { IsArray, IsString, MinLength } from "class-validator"
import { RoleEnum } from "src/commons/enum/role.enum"

export class RegisterDTO {
    @IsString()
    firstName: string
    @IsString()
    lastName: string
    @IsString()
    email: string
    @IsString()
    password: string
    @IsArray()
    roles: RoleEnum[]
}