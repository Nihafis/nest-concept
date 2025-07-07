import { IsEnum, IsIn, IsNotEmpty, IsOptional, IsString, IsUUID, Validate, ValidateNested } from "class-validator";
import { TaskStatus } from "./task.model";
import { CreateTaskLabelDto } from "./create-task-label.dto";
import { Type } from "class-transformer";

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  // @IsNotEmpty()
  // @IsUUID()
  userId: string;

  @IsOptional()
  // @ValidateNested({ each: true })
  @Type(() => CreateTaskLabelDto)
  labels?: CreateTaskLabelDto[];

  @IsOptional()
  @IsString()
  lableId?: string; // This is optional, used for MongoDB to store label IDs directly
}

export class queryDto {
  @IsString()
  @IsOptional()
  @IsIn(['pg', 'mongo'])
  source?: 'pg' | 'mongo' = 'pg';

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus
}