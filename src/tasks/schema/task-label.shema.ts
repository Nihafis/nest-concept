import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


export type TaskLabelDocument = HydratedDocument<TaskLabel>;

@Schema({
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})
export class TaskLabel {
    @Prop({ required: true })
    name: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Task', required: true })
    taskId: MongooseSchema.Types.ObjectId; // Reference to Task by ObjectId


}

export const TaskLabelSchema = SchemaFactory.createForClass(TaskLabel);

// Add compound unique index for taskId and name
TaskLabelSchema.index({ taskId: 1, name: 1 }, { unique: true });

