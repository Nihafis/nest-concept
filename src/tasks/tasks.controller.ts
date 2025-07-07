import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task as TaskPg } from './entity/task.entity';
import { Task as TaskMongo } from './schema/task.schema';
import { CreateTaskDto, queryDto } from './create-task.dto';
import { FindOneParams } from './find-one-params';
import { UpdateTaskDto } from './update-task.dto';
import { WrongTaskStatusException } from './exceptions/wrong-task-status.exception';
import { validate as isUuid } from 'uuid';
import { CreateTaskLabelDto } from './create-task-label.dto';
import { FindTaskParams } from './find-task.params';
import { PaginationParams } from '../common/pagination.params';
import { PaginationResponse } from 'src/common/pagination.response';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) { }

    @Get()
    public async findAll(
        @Query() query: FindTaskParams,
        @Query() pagination: PaginationParams,
    )
        : Promise<PaginationResponse<TaskPg>> {
        const [items, total] = await this.taskService.findAll(query, pagination);
        return {
            data: items ,
            meta: {
                total,
                ...pagination
            } 
        }
    }

    @Get(':id')
    // Note: In a real application, you would typically use a parameter decorator like @Param
    public async findOne(
        @Param() params: FindOneParams,
        @Query(new ValidationPipe({ transform: true })) query: queryDto)
        : Promise<TaskPg | TaskMongo> {
        if (query.source !== 'mongo' && !isUuid(params.id)) {
            throw new BadRequestException('id must be a valid UUID for pg source');
        }
        // Simulating a task retrieval by ID   
        return await this.findOneOrFail(params.id, query.source);
    }

    @Post()
    public async create(
        @Body() createTaskDto: CreateTaskDto,
        @Query(new ValidationPipe({ transform: true })) query: queryDto
    ): Promise<TaskPg | TaskMongo> {
        if (query.source === 'pg' && !isUuid(createTaskDto.userId)) {
            throw new BadRequestException('userId must be a valid UUID for pg source');
        }
        return await this.taskService.createTask(createTaskDto, query.source);
    }

    // @Patch(':id/status')
    // public updateTaskStatus(@Param() params: FindOneParams,
    //     @Body() body: UpdateTaskStatusDto): ITask {
    //     const task = this.findOneOrFail(params.id);
    //     task.status = body.status;
    //     return task; // Assuming the task is updated in the service
    // }

    @Patch(':id')
    public async updateTask(
        @Param() params: FindOneParams,
        @Body() updateTaskDto: UpdateTaskDto,
        @Query(new ValidationPipe({ transform: true })) query: queryDto
    ): Promise<TaskPg | TaskMongo | null> {
        if (query.source !== 'mongo' && !isUuid(params.id)) {
            throw new BadRequestException('id must be a valid UUID for pg source');
        }


        const task = await this.findOneOrFail(params.id, query.source);

        try {
            return await this.taskService.updateTask(task, updateTaskDto, query.source);
        } catch (error) {
            if (error instanceof WrongTaskStatusException) {
                throw new BadRequestException([error.message]);
            }
            throw error;
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    public async deleteTask(
        @Param() params: FindOneParams
        , @Query(new ValidationPipe({ transform: true })) query: queryDto
    ): Promise<void> {
        const task = await this.findOneOrFail(params.id, query.source);
        await this.taskService.deleteTask(task, query.source);
    }

    @Post(':id/labels')
    public async addLabels(
        @Param() { id }: FindOneParams,
        @Query(new ValidationPipe({ transform: true })) { source }: queryDto,
        @Body() labels: CreateTaskLabelDto[]
    ): Promise<TaskPg | TaskMongo | null> {
        const task = await this.findOneOrFail(id, source);
        return await this.taskService.addLabels(task, labels, source)
    }

    @Delete(':id/labels')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remobeLabels(
        @Param() { id }: FindOneParams,
        @Query(new ValidationPipe({ transform: true })) { source }: queryDto,

        @Body() labelNames: string[]
    ): Promise<void> {


        const task = await this.findOneOrFail(id, source) as TaskPg;
        await this.taskService.removeLabel(task, labelNames)
    }

    private async findOneOrFail(id: string, source: string): Promise<TaskPg | TaskMongo> {
        try {
            console.log(id);
            if (source !== 'mongo' && !isUuid(id)) {
                throw new BadRequestException('id must be a valid UUID for pg source');
            }
            const task = await this.taskService.findOne(id, source);
            if (!task) {
                throw new NotFoundException(`Task with ID ${id} not found`);
            }
            return task;
        } catch (error) {
            console.log(`Error finding task with ID ${id}:`, error);

            if (error.name === 'CastError') {
                // Handle Mongoose CastError (invalid ObjectId)
                throw new BadRequestException('Invalid Soucre and ID format');
            } else {
                throw new BadRequestException(`Error finding task with ID ${id}: ${error.message}`);
            }



        }
    }
}

