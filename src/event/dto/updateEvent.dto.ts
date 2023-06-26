import {IsDateString, IsNotEmpty, IsString} from "class-validator";

export class UpdateEventDTO {
    @IsString()
    @IsNotEmpty()
    name: string
    @IsDateString()
    @IsNotEmpty()
    start_date: Date
    @IsString()
    @IsNotEmpty()
    place: string
}