import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  fullName: string;
  email: string;
  password: string;
  role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: number;
}
