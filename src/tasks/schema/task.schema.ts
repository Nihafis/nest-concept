import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskStatus } from "../task.model";
import { TaskLabel, TaskLabelSchema } from './task-label.shema';


export type TaskDocument = HydratedDocument<Task>;

@Schema()

export class Task {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true, enum: TaskStatus, default: 'OPEN' })
    status: string; // You can also use an enum for TaskStatus if defined elsewhere

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    userId: MongooseSchema.Types.ObjectId; // Reference to User by ObjectId

    @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'TaskLabel', default: [] })
    labels: MongooseSchema.Types.ObjectId[]; // Array of TaskLabel ObjectIds
}

export const TaskSchema = SchemaFactory.createForClass(Task);

TaskSchema.post('findOneAndDelete', async function (doc: TaskDocument) {
    if (doc) {
        // Assuming you have a TaskLabel model and schema defined
        const TaskLabel = doc.model('TaskLabel'); // Get the TaskLabel model
        await TaskLabel.deleteMany({ taskId: doc._id }); // Delete all labels associated with the task
    }
})

