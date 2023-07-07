import { ApiProperty } from "@nestjs/swagger";
import {IsDateString, IsISO8601, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class UpdateEventDTO {

    @ApiProperty({
        name: 'name',
        description: 'The name of the event',
        example: 'NameOfTheEvent'
    })
    @IsString()
    @IsOptional()
    name: string

    @ApiProperty({
        name: 'start_date',
        description: 'The start_date of the event',
        example: '2023-06-26T12:13:47+0000'
    })
    @IsISO8601()
    @IsOptional()
    start_date: string

    @ApiProperty({
        name: 'place',
        description: 'The place of the event',
        example: 'CAEN'
    })
    @IsString()
    @IsOptional()
    place: string
}