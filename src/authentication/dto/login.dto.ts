import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class LoginDTO {

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
}