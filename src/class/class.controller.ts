import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { Public } from 'src/auth/public';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { ResponseGenerator } from 'src/core/response.render';
import { ClassService } from './class.service';
import { CreateClassDto, UpdateClassDto } from './dto/class.dto';

@Roles(Role.Teacher)
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Public()
  @Post()
  async create(@Body() createClassDto: CreateClassDto) {
    const classObj = await this.classService.create(createClassDto);
    return ResponseGenerator.responseGenerator(true, classObj, '00');
  }

  @Get()
  async findAll() {
    const classObj = await this.classService.findAll();
    return ResponseGenerator.responseGenerator(true, classObj, '00');
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const classObj = await this.classService.findOne(id);
    return ResponseGenerator.responseGenerator(true, classObj, '00');
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.update(id, updateClassDto);
  }
}
