import { ApiProperty } from "@nestjs/swagger";
import {IsDateString, IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateEventDTO {

    @ApiProperty({
        name: 'name',
        description: 'The name of the event',
        example: 'NameOfTheEvent'
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        name: 'start_date',
        description: 'The start_date of the event',
        example: '2023-06-26T12:13:47+0000'
    })
    @IsISO8601()
    @IsNotEmpty()
    start_date: string

    @ApiProperty({
        name: 'place',
        description: 'The place of the event',
        example: 'CAEN'
    })
    @IsString()
    @IsNotEmpty()
    place: string

    @ApiProperty({
        name: 'numberTicket',
        description: 'The number of ticket you want to create for the event',
        example: 20
    })
    @IsNumber()
    @IsOptional()
    numberTicket: number
}