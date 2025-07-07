// import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
// import { TaskStatus } from "./task.mode";
import { PartialType } from "@nestjs/mapped-types";
import { CreateTaskDto } from "./create-task.dto";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    // Uncomment the following lines if you  not extend PartialType 
    // @IsNotEmpty()
    // @IsString()
    // @IsOptional()
    // title?: string;

    // @IsNotEmpty()
    // @IsString()
    // @IsOptional()
    // description?: string;

    // @IsNotEmpty()
    // @IsEnum(TaskStatus)
    // @IsOptional()
    // status?: TaskStatus;
}