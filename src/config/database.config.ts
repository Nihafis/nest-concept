import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

//  postgreSQL or MySQL configuration
export const typeOrmConfig = registerAs('database', (): TypeOrmModuleOptions => ({
    type: "postgres",
    host: process.env.DB_PG_HOST,
    port: parseInt(process.env.DB_PG_PORT ?? '27017'),
    username: process.env.DB_PG_USERNAME,
    password: process.env.DB_PG_PASSWORD,
    database: process.env.DB_PG_NAME,
    synchronize: Boolean(process.env.DB_PG_SYNC ?? false),
})
)


export const MongooseConfig = registerAs('mongo', () => ({
    connectionString: `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    // connectionString: process.env.DB_CONNECTION_STRING,
})) 