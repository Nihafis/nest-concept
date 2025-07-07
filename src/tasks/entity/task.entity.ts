// for pgsql

import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TaskStatus } from "../task.model";
import { User } from "../../users/user.entity";
import { TaskLabel } from "./task-label.entity";

@Entity()
export class Task {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    title: string;

    @Column({
        type: 'text',
        nullable: false
    })
    description: string;

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.OPEN
    })
    status: TaskStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    userId: string;

    @ManyToOne(() => User, user => user.tasks, { nullable: false })
    user: User; 




    @OneToMany(() => TaskLabel, label => label.task, {
        cascade: true,
     })
    labels: TaskLabel[]; // Assuming labels are stored as an array of strings, adjust as necessary
}