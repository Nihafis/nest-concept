import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task as TaskMongo, TaskSchema } from './schema/task.schema';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Task as TaskPg } from './entity/task.entity';
import { TaskLabel as TaskLabelMongo, TaskLabelSchema } from './schema/task-label.shema';
import { User as UserMongo, UserSchema } from '../users/user.schema';
import { TaskLabel as TaskLabelPg } from './entity/task-label.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskPg, TaskLabelPg]),
    MongooseModule.forFeature([
      { name: TaskMongo.name, schema: TaskSchema },
      { name: TaskLabelMongo.name, schema: TaskLabelSchema },
      { name: UserMongo.name, schema: UserSchema },

    ])

  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule { }
