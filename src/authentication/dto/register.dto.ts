import {IsArray, IsNotEmpty, isNotEmpty, IsOptional, IsString, MinLength} from "class-validator"
import { RoleEnum } from "../../commons/enum/role.enum"

export class RegisterDTO {
    @IsString()
    @IsNotEmpty()
    firstName: string
    @IsString()
    @IsNotEmpty()
    lastName: string
    @IsString()
    @IsNotEmpty()
    email: string
    @IsString()
    @IsNotEmpty()
    password: string
    @IsArray()
    @IsOptional()
    roles: RoleEnum[]
}