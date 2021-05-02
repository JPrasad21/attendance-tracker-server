import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto as createSectionDto, CreateSectionDto, UpdateClassDto } from './dto/class.dto';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  create(@Body() createClassDto: createSectionDto) {
    return this.classService.create(createClassDto);
  }

  @Get()
  findAll() {
    return this.classService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(id);
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
  updateSection(@Param('classId') classId: string,@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.updateSection(classId, id, updateClassDto);
  }
}
