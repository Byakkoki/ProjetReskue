import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UpdateUserDTO {

    @ApiProperty({
        name: 'firstName',
        description: 'The First Name of the user',
        example: 'Jordan'
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    firstName: string

    @ApiProperty({
        name: 'lastName',
        description: 'The Last Name of the user',
        example: 'PICANT'
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    lastName: string

    @ApiProperty({
        name: 'email',
        description: 'The Email of the user',
        example: 'jordan.picant.14@gmail.com'
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    email: string
}