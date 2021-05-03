import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AttendanceService } from 'src/attendance/attendance.service';
import { Class, ClassDocument } from 'src/class/schema/class.schema';
import { hashing } from 'src/utils/utils';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { User, UserDocument } from './schema/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Class.name) private classModel: Model<ClassDocument>,
    private attendanceService: AttendanceService,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }
  async createTeacher() {
    const teacher: CreateUserDto = {
      fullName: `Teacher`,
      email: `teacher@gmail.com`,
      role: 'Teacher',
      password: `teacher2021`,
    };
    teacher.password = await hashing(teacher.password);
    await this.create(teacher);
  }
  async createStudent() {
    const classObjs = await this.classModel.find().exec();
    for (let i = 0; i < classObjs.length; i++) {
      const { _id, className, sectionName } = classObjs[i];
      for (let studentIndex = 0; studentIndex < 5; studentIndex++) {
        const student: CreateUserDto = {
          fullName: `Student ${studentIndex + 1}`,
          email: `student${
            studentIndex + 1
          }-${className}-${sectionName}@gmail.com`,
          role: 'Student',
          password: `student${studentIndex + 1}-${className}-${sectionName}`,
          class: _id,
        };
        student.password = await hashing(student.password);
        let user = await this.create(student);
      }
    }
    return { result: 'Success' };
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  async findStudent(studentId: string) {
    let user = (
      await this.userModel.aggregate([
        {
          $match: {
            _id: Types.ObjectId(studentId),
          },
        },
        {
          $lookup: {
            from: 'Class',
            localField: 'class',
            foreignField: '_id',
            as: 'classDetails',
          },
        },
        {
          $lookup: {
            from: 'Attendance',
            localField: '_id',
            foreignField: 'studentId',
            as: 'attendanceList',
          },
        },
      ])
    )[0];
    user.attendancePercentage = this.attendanceService.getAttendancePercentageForStudent(
      user.attendanceList,
    );
    return user;
  }
  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
