import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAttendanceDto } from './dto/attendance.dto';
import { Attendance, AttendanceDocument } from './schema/attendance.schema';
import * as dayjs from "dayjs";
@Injectable()
export class AttendanceService {
  constructor(@InjectModel(Attendance.name) private attendanceModel: Model<AttendanceDocument>) { }
  async create(createAttendanceDto: CreateAttendanceDto) {
    createAttendanceDto.date = dayjs().format('DD/MM/YYYY');
    const result = await this.attendanceModel.create(createAttendanceDto);
    return result;
  }

  async IsAttendanceMarked(studentId: string) {
    const date = dayjs().format('DD/MM/YYYY');
    const result = await this.attendanceModel.findOne({ studentId, date })
    return result ? true : false;
  }
  findAll() {
    return `This action returns all attendance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attendance`;
  }
}
