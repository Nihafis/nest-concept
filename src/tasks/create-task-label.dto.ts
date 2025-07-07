import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateTaskLabelDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @IsOptional()
    labelId?: string

    // @IsUUID()
    // taskId: string; // Reference to Task by ObjectId
}