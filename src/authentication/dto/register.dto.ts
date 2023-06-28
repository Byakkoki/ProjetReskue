import {IsArray, IsNotEmpty, isNotEmpty, IsOptional, IsString, MinLength} from "class-validator"
import { RoleEnum } from "../../commons/enum/role.enum"
import { ApiProperty } from "@nestjs/swagger"

export class RegisterDTO {

    @ApiProperty({
        name: 'firstName',
        description: 'The First Name of the user',
        example: 'Jordan'
    })
    @IsString()
    @IsNotEmpty()
    firstName: string

    @ApiProperty({
        name: 'lastName',
        description: 'The Last Name of the user',
        example: 'PICANT'
    })
    @IsString()
    @IsNotEmpty()
    lastName: string

    @ApiProperty({
        name: 'email',
        description: 'The Email of the user',
        example: 'jordan.picant.14@gmail.com'
    })
    @IsString()
    @IsNotEmpty()
    email: string

    @ApiProperty({
        name: 'password',
        description: 'The Password of the user',
        example: 'cebeaumdp'
    })
    @IsString()
    @IsNotEmpty()
    password: string

    @ApiProperty({
        name: 'roles',
        description: 'The Roles of the user',
        examples: [
            "USER",
            "ADMIN"
        ]
    })
    @IsArray()
    @IsNotEmpty()
    roles: RoleEnum[]
}