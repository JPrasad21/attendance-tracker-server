import { PartialType } from '@nestjs/mapped-types';

export class CreateAttendanceDto {
  studentId: string;
  classId: string;
  date: string;
  sessionId: string;
}

export class UpdateAttendanceDto extends PartialType(CreateAttendanceDto) {
  id: number;
}
