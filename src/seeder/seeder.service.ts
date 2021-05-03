import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClassService } from 'src/class/class.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SeederService {
  constructor(
    private classService: ClassService,
    private userService: UsersService,
  ) {}
  async create() {
    try {
      await this.classService.create();
      await this.userService.createTeacher();
      await this.userService.createStudent();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return 'success';
  }
}
