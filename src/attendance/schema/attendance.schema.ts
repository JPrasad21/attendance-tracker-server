import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

export type AttendanceDocument = Attendance & Document;

@Schema()
export class Attendance {

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'User' })
  studentId: string;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'Class' })
  classId: string;

  @Prop()
  sectionId: string;

  @Prop()
  date: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);