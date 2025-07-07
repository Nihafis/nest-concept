import { Expose } from "class-transformer";
import { Task } from "../tasks/entity/task.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "./role.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Expose()
    name: string;

    @Column()
    @Expose()
    email: string;

    @Column()
    password: string

    @CreateDateColumn()
    @Expose()
    createdAt: Date;

    @UpdateDateColumn()
    @Expose()
    updatedAt: Date;

    @OneToMany(() => Task, task => task.user) // Assuming a one-to-many relationship with tasks
    @Expose()
    tasks: Task[]; // Assuming a one-to-many relationship with tasks

    @Column('text', { array: true, default: [Role.USER] })
    @Expose()
    roles: Role[]
}