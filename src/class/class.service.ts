import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClassDto, UpdateClassDto } from './dto/class.dto';
import { Class, ClassDocument } from './schema/class.schema';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name) private classModel: Model<ClassDocument>,
  ) {}
  async create(createClassDto: CreateClassDto) {
    const classes = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
    ];
    const section = ['A', 'B', 'C', 'D'];
    for (let cIndex = 0; cIndex < classes.length; cIndex++) {
      const className = classes[cIndex];
      const classObj: Class = {
        className,
        sectionName: '',
      };
      for (let sIndex = 0; sIndex < section.length; sIndex++) {
        classObj.sectionName = section[sIndex];
        await this.classModel.create(classObj);
      }
    }
    return { success: 'true' };
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
}
