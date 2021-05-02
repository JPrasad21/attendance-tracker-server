import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService as UserService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { ResponseGenerator } from 'src/core/response.render';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/student')
  createStudent() {
    return this.userService.createStudent();
  }
  @Post('/teacher')
  createTeacher() {
    return this.userService.createTeacher();
  }

  @Get('/student/:studentId')
  async findStudent(@Param('studentId') studentId: string) {
    const user = await this.userService.findStudent(studentId);
    return ResponseGenerator.responseGenerator(true, user, '00');
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
