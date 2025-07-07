
import { AppConfig } from "./app.config";
import * as Joi from "joi";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AuthConfig } from "./auth.config";

export interface ConfigTypes {
    app: AppConfig
    database: TypeOrmModuleOptions
    mongo: TypeOrmModuleOptions
    auth: AuthConfig;
}

export const appConfigSchema = Joi.object({
    APP_MEESSAGE_PREFIX: Joi.string().default('Hello '),
    DB_HOST: Joi.string().default('localhost'),
    DB_PORT: Joi.number().default(27017),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().default('admin'),


    DB_PG_HOST: Joi.string().default('localhost'),
    DB_PG_PORT: Joi.number().default(5432),
    DB_PG_USERNAME: Joi.string().required(),
    DB_PG_PASSWORD: Joi.string().required(),
    DB_PG_NAME: Joi.string().default('tasks'),
    DB_PG_SYNC: Joi.number().valid(0, 1).required(),

    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().default('60m')
})