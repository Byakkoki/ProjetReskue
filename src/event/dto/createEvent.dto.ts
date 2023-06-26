import {IsDateString, IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateEventDTO {
    @IsString()
    @IsNotEmpty()
    name: string
    @IsISO8601()
    @IsNotEmpty()
    start_date: string
    @IsString()
    @IsNotEmpty()
    place: string
    @IsNumber()
    @IsOptional()
    numberTicket: number
}