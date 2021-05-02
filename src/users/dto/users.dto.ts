import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  fullName: string;
  email: string;
  password: string;
  role: string;
  className?: string;
  sectionName?: string; 
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: number;
}
