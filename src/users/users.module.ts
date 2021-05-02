import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/users.schema';
import { Class, ClassSchema } from 'src/class/schema/class.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema, collection: 'Users' }, { name: Class.name, schema: ClassSchema, collection: 'Class' }])],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
