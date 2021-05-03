import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { ClassModule } from 'src/class/class.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [SeederController],
  imports: [ClassModule, UsersModule],
  providers: [SeederService],
})
export class SeederModule {}
