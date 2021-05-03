import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

export type ClassDocument = Class & Document;
@Schema()
export class Class {
  @Prop()
  className: string;
  @Prop()
  sectionName: string;
}
const ClassSchema = SchemaFactory.createForClass(Class);
ClassSchema.index({ className: 1, sectionName: 1 }, { unique: true });
export { ClassSchema };
