import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ResponseGenerator } from 'src/core/response.render';
import { ClassService } from './class.service';
import { CreateClassDto as createSectionDto, CreateSectionDto, UpdateClassDto } from './dto/class.dto';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) { }

  @Post()
  async create(@Body() createClassDto: createSectionDto) {
    const classObj = await this.classService.create(createClassDto);
    return ResponseGenerator.responseGenerator(true, classObj, '00');
  }

  @Get()
  async findAll() {
    const classObj = await this.classService.findAll()
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

  @Post(':classId/section')
  createSection(@Param('classId') classId: string, @Body() createSectionDto: CreateSectionDto) {
    return this.classService.createSection(createSectionDto);
  }

  @Get(':classId/section')
  findAllSections(@Param('classId') classId: string) {
    return this.classService.findAllSections(classId);
  }

  @Get(':classId/section/:id')
  findSection(@Param('classId') classId: string, @Param('id') id: string) {
    return this.classService.findSection(classId, id);
  }

  @Put(':classId/section/:id')
  updateSection(@Param('classId') classId: string, @Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.updateSection(classId, id, updateClassDto);
  }
}
