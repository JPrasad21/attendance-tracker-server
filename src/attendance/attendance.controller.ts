import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ResponseGenerator } from 'src/core/response.render';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  async create(@Body() createAttendanceDto: CreateAttendanceDto) {
    const attendance = await this.attendanceService.create(createAttendanceDto);
    return ResponseGenerator.responseGenerator(
      true,
      attendance ? true : false,
      '00',
    );
  }

  @Get('/check/:studentId')
  async IsAttendanceMarkedForStudent(@Param('studentId') studentId: string) {
    const result = await this.attendanceService.IsAttendanceMarked(studentId);
    return ResponseGenerator.responseGenerator(true, result, '00');
  }

  @Get('/:studentId')
  getAttendanceByStudentId(@Param('studentId') studentId: string) {
    return this.attendanceService.getAttendanceByStudentId(studentId);
  }
}
