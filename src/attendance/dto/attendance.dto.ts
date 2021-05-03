import { PartialType } from '@nestjs/mapped-types';

export class CreateAttendanceDto {
  studentId: string;
  classId: string;
  date: string;
  status: string;
}

export class UpdateAttendanceDto extends PartialType(CreateAttendanceDto) {
  _id: string;
}
