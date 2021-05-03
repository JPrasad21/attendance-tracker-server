import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateClassDto,
  CreateSectionDto,
  UpdateClassDto,
  UpdateSectionDto,
} from './dto/class.dto';
import {
  Class,
  ClassDocument,
  Section,
  SectionDocument,
} from './schema/class.schema';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name) private classModel: Model<ClassDocument>,
    @InjectModel(Section.name) private sectionModel: Model<SectionDocument>,
  ) {}
  create(createClassDto: CreateClassDto) {
    return this.classModel.create(createClassDto);
  }

  findAll() {
    return this.classModel.find().populate('sections.studentId').exec();
  }

  findOne(id: string) {
    return this.classModel
      .findOne({ _id: id })
      .populate('sections.studentId')
      .exec();
  }

  update(id: string, updateClassDto: UpdateClassDto) {
    return this.classModel.updateOne({ _id: id }, updateClassDto);
  }

  createSection(createSectionDto: CreateSectionDto) {
    return this.sectionModel.create(createSectionDto);
  }

  findAllSections(classId: string) {
    return this.sectionModel.find({ classInfo: classId }).exec();
  }

  findSection(classId: string, id: string) {
    return this.sectionModel.findOne({ _id: id, classInfo: classId }).exec();
  }

  updateSection(
    classId: string,
    id: string,
    updateSectionDto: UpdateSectionDto,
  ) {
    return this.sectionModel.updateOne(
      { _id: id, classInfo: classId },
      updateSectionDto,
    );
  }
}
