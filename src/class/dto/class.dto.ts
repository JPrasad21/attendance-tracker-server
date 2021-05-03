import { PartialType } from '@nestjs/mapped-types';

export class CreateClassDto {
  className: string;
  sectionName: string;
}
export class UpdateClassDto extends PartialType(CreateClassDto) {
  id: string;
}
