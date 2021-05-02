import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

export type ClassDocument = Class & Document;
export type SectionDocument = Section & Document;

@Schema()
export class Class {
  @Prop({unique: true})
  className: string;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'Section' })
  sections: Section[];
}

@Schema()
export class Section {
  @Prop()
  sectionName: string;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'Class' })
  classInfo: string;
}

const ClassSchema = SchemaFactory.createForClass(Class);
const SectionSchema = SchemaFactory.createForClass(Section);

export {
  ClassSchema, SectionSchema
}