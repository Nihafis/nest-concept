import { config } from 'dotenv'
import { DataSource } from 'typeorm';


config();

export default new DataSource({
    type: "postgres",
    host: process.env.DB_PG_HOST,
    port: parseInt(process.env.DB_PG_PORT ?? '27017'),
    username: process.env.DB_PG_USERNAME,
    password: process.env.DB_PG_PASSWORD,
    database: process.env.DB_PG_NAME,
    synchronize: false,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/src/migrations/*{.ts,.js}'],
})