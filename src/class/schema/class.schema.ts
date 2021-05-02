import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

export type ClassDocument = Class & Document;
export type SectionDocument = Section & Document;

@Schema()
export class Section {
  @Prop()
  sectionName: string;
}
const SectionSchema = SchemaFactory.createForClass(Section);

@Schema()
export class Class {
  @Prop({unique: true})
  className: string;

  @Prop({type: [SectionSchema]})
  sections: Section[];
}
const ClassSchema = SchemaFactory.createForClass(Class);

export {
  ClassSchema, SectionSchema
}