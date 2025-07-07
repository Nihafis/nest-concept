import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Task } from "./task.entity";

@Entity()
@Unique(['taskId', 'name'])
export class TaskLabel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    @Index()
    taskId: string;

    @ManyToOne(() => Task, task => task.labels, {
        orphanedRowAction: 'delete',
        onDelete: 'CASCADE'
    })
    task: Task;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}