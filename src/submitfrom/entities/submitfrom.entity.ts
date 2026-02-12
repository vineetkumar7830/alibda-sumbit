import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubmitFromDocument = SubmitFrom & Document;

@Schema({ timestamps: true })
export class SubmitFrom {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  // ✅ dropdown value as string
  @Prop({ required: true })
  projectType: string;

  @Prop({ required: true })
  projectDetails: string;
}

export const SubmitFromSchema = SchemaFactory.createForClass(SubmitFrom);
