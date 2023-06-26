import {IsDateString, IsISO8601, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class UpdateEventDTO {
    @IsString()
    @IsOptional()
    name: string
    @IsISO8601()
    @IsOptional()
    start_date: string
    @IsString()
    @IsOptional()
    place: string
}