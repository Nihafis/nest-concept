export const testConfig = {
    database: {
        type: "postgres",
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'tasks_e2e',
        synchronize: true,
    },
    app: {
        messagePrefix: '',
    },
    auth: {
        jwt: {
            secret: 'secret-1234',
            expiresIn: '1m'
        }
    },
    mongo:'mongodb://admin:secret123@localhost:27017/?authSource=task_e2e'

}