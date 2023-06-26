import {IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateEventDTO {
    @IsString()
    @IsNotEmpty()
    name: string
    @IsDateString()
    @IsNotEmpty()
    start_date: Date
    @IsString()
    @IsNotEmpty()
    place: string
    @IsNumber()
    @IsOptional()
    numberTicket: number
}