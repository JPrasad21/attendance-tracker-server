import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Attendance, AttendanceSchema } from './schema/attendance.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Attendance.name, schema: AttendanceSchema, collection: 'Attendance' }])],
  controllers: [AttendanceController],
  providers: [AttendanceService]
})
export class AttendanceModule { }
