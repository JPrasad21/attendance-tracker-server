import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/users.schema';
import { Class, ClassSchema } from 'src/class/schema/class.schema';
import { AttendanceModule } from 'src/attendance/attendance.module';
import { AttendanceService } from 'src/attendance/attendance.service';
import {
  Attendance,
  AttendanceSchema,
} from 'src/attendance/schema/attendance.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema, collection: 'Users' },
      { name: Class.name, schema: ClassSchema, collection: 'Class' },
      {
        name: Attendance.name,
        schema: AttendanceSchema,
        collection: 'Attendance',
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UsersService, AttendanceService],
  exports: [UsersService],
})
export class UsersModule {}
