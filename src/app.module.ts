import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DummyService } from './dummy/dummy.service';
import { MessageFormatterService } from './message-formatter/message-formatter.service';
import { LoggerService } from './logger/logger.service';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfog } from './config/app.config';
import { appConfigSchema } from './config/config.types';
import {
  MongooseConfig,
  typeOrmConfig

} from './config/database.config';
// import { TypeOrmModule } from '@nestjs/typeorm'; // Uncomment if using TypeORM with PostgreSQL or MySQL
import { TypeConfigService } from './config/typed-config.service';
// import { MongooseModule } from '@nestjs/mongoose';
import { Task } from './tasks/entity/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { TaskLabel } from './tasks/entity/task-label.entity';
import { AuthConfig } from './config/auth.config';
import { UserModule } from './users/users.module';


@Module({
  imports: [
    // ใช้ TypeOrmModule สำหรับการเชื่อมต่อกับฐานข้อมูล PostgreSQL หรือ MySQL
    // หากต้องการใช้ TypeORM กับ MongoDB ให้ใช้ MongooseModule แทน
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: TypeConfigService) => ({
        ...configService.get('database'),
        entities: [Task, User, TaskLabel],
        synchronize: true, // This line is necessary for development to auto-create tables
        //     //  if prostgreSQL is used, uncomment this line  If using MongoDB, this line is not necessary


      })
    }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('mongo.connectionString'),
    //   })
    // }),

    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfog,
        typeOrmConfig, // prostgreSQL or MySQL configuration
        MongooseConfig,
        AuthConfig],
      validationSchema: appConfigSchema,
      validationOptions: {
        // allowUnknown: false, // Allows unknown environment variables
        abortEarly: true, // Stops validation on the first error
      }
    }),
    TasksModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, DummyService, MessageFormatterService, LoggerService, {
    provide: TypeConfigService,
    useExisting: ConfigService
  }],
})
export class AppModule { }
