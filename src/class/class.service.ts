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

  findOne(id: string) {
    return this.classModel.find().populate('sections.studentId').exec();
  }

  async findAll(date: string) {
    const classObj = await this.classModel.aggregate([
      {
        $lookup: {
          from: 'Attendance',
          as: 'attendance',
          let: {
            class_id: '$_id',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$date', date],
                    },
                    {
                      $eq: ['$classId', '$$class_id'],
                    },
                  ],
                },
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'Users',
          localField: '_id',
          foreignField: 'class',
          as: 'students',
        },
      },
      {
        $project: {
          className: 1,
          sectionName: 1,
          attendanceCount: {
            $size: '$attendance',
          },
          studentsCount: {
            $size: '$students',
          },
        },
      },
      {
        $project: {
          className: 1,
          sectionName: 1,
          percentage: {
            $divide: ['$attendanceCount', '$studentsCount'],
          },
        },
      },
    ]);
    return classObj;
  }

  update(id: string, updateClassDto: UpdateClassDto) {
    return this.classModel.updateOne({ _id: id }, updateClassDto);
  }
}
