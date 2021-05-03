import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Class,
  ClassSchema,
  Section,
  SectionSchema,
} from './schema/class.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema, collection: 'Class' },
      { name: Section.name, schema: SectionSchema, collection: 'Section' },
    ]),
  ],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
