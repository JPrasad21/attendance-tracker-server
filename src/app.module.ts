import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClassModule } from './class/class.module';
import { AttendanceModule } from './attendance/attendance.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/attendance-tracker'),
    AuthModule,
    UsersModule,
    ClassModule,
    AttendanceModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
