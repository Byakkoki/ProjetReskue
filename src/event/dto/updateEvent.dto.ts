import {IsDateString, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class UpdateEventDTO {
    @IsString()
    @IsOptional()
    name: string
    @IsDateString()
    @IsOptional()
    start_date: Date
    @IsString()
    @IsOptional()
    place: string
}