import { Injectable, Search } from '@nestjs/common';
import { TaskStatus } from './task.model';
import { CreateTaskDto, queryDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';
import { WrongTaskStatusException } from './exceptions/wrong-task-status.exception';
import { Repository } from 'typeorm';
import { Task as TaskPg } from './entity/task.entity';
import { Task as TaskMongo } from './schema/task.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskLabel as TaskLabelMongo } from './schema/task-label.shema';
import { CreateTaskLabelDto } from './create-task-label.dto';
import { TaskLabel as TaskLabelPg } from './entity/task-label.entity';
import { FindTaskParams } from './find-task.params';
import { PaginationParams } from 'src/common/pagination.params';


@Injectable()
export class TasksService {


    constructor(

        @InjectRepository(TaskPg)
        private readonly tasksRepositoryPg: Repository<TaskPg>, // Assuming you are using TypeORM with a repository pattern

        // @InjectModel(TaskMongo.name)// Injecting the MongoDB repository
        // private readonly taskMongo: Model<TaskMongo>, // Assuming you are using TypeORM with a repository pattern

        @InjectRepository(TaskLabelPg)
        private readonly labelRepositoryPg: Repository<TaskLabelPg>,

        // @InjectModel(TaskLabelMongo.name) // Injecting the TaskLabel model for MongoDB
        // private readonly taskLabelMongo: Model<TaskLabelMongo>, // Assuming you are using Mongoose for MongoDB

    ) { }

    public async findAll(
        query: FindTaskParams,
        pagination: PaginationParams,
        userId: string

    ): Promise<[TaskPg[], number]> {
        const queryBuilder = this.tasksRepositoryPg
            .createQueryBuilder('task')
            .leftJoinAndSelect('task.labels', 'labels')
            .where('task.userId=:userId', { userId })

        if (query.status) {
            queryBuilder.andWhere('task.status=:status', { status: query.status })
        }

        if (query.search) {
            queryBuilder.andWhere('(task.title ILIKE :search OR task.description ILIKE :search)', { search: `%${query.search}%` })
        }

        if (query.labels?.length) {
            const subQuery = queryBuilder.subQuery()
                .select('labels.taskId')
                .from('task_label', 'labels')
                .where('labels.name IN (:...names)', { names: query.labels })
                .getQuery()

            queryBuilder.andWhere(`task.id IN (${subQuery})`)

            // queryBuilder.andWhere('labels.name IN (:...names)',
            //     { names: query.labels }
            // )
        }

        queryBuilder.orderBy(`task.${query.sortBy}`, query.sortOrder)

        queryBuilder.skip(pagination.offset).take(pagination.limit);

        // console.log(queryBuilder.getSql());

        return queryBuilder.getManyAndCount();


        // let where: FindOptionsWhere<TaskPg> | FindOptionsWhere<TaskPg>[] = {};
        // if (query.search?.trim()) {
        //     where = [
        //         { title: Like(`%${query.search}%`), status: query.status },
        //         { description: Like(`%${query.search}%`), status: query.status }
        //     ];
        // } else if (query.status) {
        //     where = { status: query.status };
        // }
        // console.log(where);

        // const tasks = await this.tasksRepositoryPg.findAndCount({
        //     where,
        //     relations: ['labels'],
        //     skip: pagination.offset,
        //     take: pagination.limit
        // });

        // return tasks; // For PostgreSQL or MySQL

    }

    public async findOne(id: string, source: string): Promise<TaskPg | TaskMongo | null> {
        let task: TaskPg | TaskMongo | null;
        // if (source === 'mongo') {
        //     task = await this.taskMongo.findById({
        //         _id: new Types.ObjectId(id) // Convert string ID to ObjectId for MongoDB
        //     }).populate('labels').exec(); // Assuming you want to populate labels   

        // }
        //  else 
        //  {
        task = await this.tasksRepositoryPg.findOne({
            where: { id },
            relations: ['labels'] // Assuming you want to load labels as well
        });
        // }
        return task

    }

    public async createTask(createTaskDto: CreateTaskDto, source: string): Promise<TaskPg | TaskMongo> {
        if (createTaskDto.labels) {
            createTaskDto.labels = this.getUniqueLabels(createTaskDto.labels)
        }
        // if (source === 'mongo') {
        //     const { labels, ...taskData } = createTaskDto;
        //     const task = await this.taskMongo.create(taskData);
        //     let labelIds: Types.ObjectId[] = []; // Initialize an empty array for label IDs
        //     if (labels && labels.length > 0) {
        //         const createdLabels = await this.taskLabelMongo.insertMany(labels.map(label => ({
        //             ...label, taskId: task._id
        //         })));
        //         labelIds = createdLabels.map(label => label._id);
        //     }
        //     task.labels = labelIds as []; // Assuming labels is an array of ObjectIds in MongoDB
        //     await task.save(); // Save the task with the new labels
        //     return task;
        // } 
        // else {
        // await this.tasksRepositoryPg.create({
        // })
        return await this.tasksRepositoryPg.save(createTaskDto)

        // }

    }

    public async updateTask(task: TaskPg | TaskMongo, updateTaskDto: UpdateTaskDto, source: string): Promise<TaskPg | TaskMongo | null> {
        if (updateTaskDto.status && !this.isValidStatusTransition(task.status as TaskStatus, updateTaskDto.status)) {
            throw new WrongTaskStatusException();
        }

        if (updateTaskDto.labels) {
            updateTaskDto.labels = this.getUniqueLabels(updateTaskDto.labels)
        }

        // if (source === 'mongo') {
        //     const taskId = (task as any)._id ?? (task as any).id;

        //     let labelIds: Types.ObjectId[] | undefined = undefined;
        //     if (updateTaskDto.labels) {
        //         // Update each label's name by its _id
        //         await Promise.all(
        //             updateTaskDto.labels.map(label =>
        //                 this.taskLabelMongo.findByIdAndUpdate(
        //                     label.labelId,
        //                     { name: label.name },
        //                     { new: true }
        //                 )
        //             )
        //         );
        //         // Collect label IDs for the task
        //         labelIds = updateTaskDto.labels.map(label => new Types.ObjectId(label.labelId));
        //     }

        //     // Update the task with the new label ObjectIds and other properties
        //     await this.taskMongo.findByIdAndUpdate(
        //         taskId,
        //         {
        //             ...updateTaskDto,
        //             labels: labelIds

        //         },
        //         { new: true }
        //     ).exec();

        //     return await this.taskMongo.findById(taskId).populate('labels').exec();
        // } 
        // else {
        // PostgreSQL

        Object.assign(task, updateTaskDto);
        return await this.tasksRepositoryPg.save(task as TaskPg);
        // }
    }


    public async addLabels(task: TaskMongo | TaskPg, labelDtos: CreateTaskLabelDto[], source: string): Promise<TaskMongo | TaskPg | null> {
        // if (source === 'mongo') {
        //     return null
        // } 
        // else {
        // 1) dup DTOs
        // 2) get existing names
        // 3) New labels aren't already existing one
        // 4) We save new ones , only if there are any real new ones
        const names = new Set(task.labels.map((label) => label.name))

        const labels = this.getUniqueLabels(labelDtos)
            .filter(dto => !names.has(dto.name))
            .map((label) => this.labelRepositoryPg.create(label));
        if (labels.length) {
            task.labels = [...task.labels, ...labels] as any;
            return await this.tasksRepositoryPg.save(task as TaskPg);
        }
        return task
        // }
    }

    public async removeLabel(task: TaskPg, labelsToRemove: string[]): Promise<TaskPg> {
        // await this.tasksRepositoryPg.remove(task)
        // 1.Remove existing labels from labels array
        // 2.Ways to solve
        //  a) remove labels from task->label and save() the task
        //  b) query builder - SQL that delete labels
        task.labels = task.labels.filter(
            label => !labelsToRemove.includes(label.name)
        );

        return await this.tasksRepositoryPg.save(task);

    }

    private isValidStatusTransition(
        currentStatus: TaskStatus,
        newStatus: TaskStatus
    ): boolean {
        const statusOrder = [
            TaskStatus.OPEN,
            TaskStatus.IN_PROGRESS,
            TaskStatus.DONE
        ]

        return statusOrder.indexOf(currentStatus) <= statusOrder.indexOf(newStatus);
    }



    public async deleteTask(task: TaskPg | TaskMongo, source: string): Promise<void> {
        // if (source === 'mongo') {
        //     await this.taskMongo.findOneAndDelete({ _id: (task as any)._id ?? (task as any).id });

        // }
        // else {
        await this.tasksRepositoryPg.delete((task as TaskPg).id);

        // }
    }

    private getUniqueLabels(labelDtos: CreateTaskLabelDto[]): CreateTaskLabelDto[] {
        const uniqueNames = [...new Set(labelDtos.map(label => label.name))];

        return uniqueNames.map(name => ({ name }));
    }
}
