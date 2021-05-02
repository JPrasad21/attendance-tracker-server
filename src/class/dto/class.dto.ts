import { PartialType } from "@nestjs/mapped-types";


interface Section {
  sectionName: string;
  students: any[];
  teacher: any
}

export class CreateClass{
  className: string;
  sections: Section[];


}

export class CreateClassDto {
  className: string;
}
export class UpdateClassDto extends PartialType(CreateClassDto) {
  id: string;
}
export class CreateSectionDto {
  sectionName: string;
  classInfo: string;
}
export class UpdateSectionDto extends PartialType(CreateSectionDto) {
  id: string;
}