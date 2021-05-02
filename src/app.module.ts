import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClassModule } from './class/class.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/attendance-tracker'),
    AuthModule,
    UsersModule,
    ClassModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
