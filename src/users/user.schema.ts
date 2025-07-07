import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})

export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    
}

export const UserSchema = SchemaFactory.createForClass(User); 