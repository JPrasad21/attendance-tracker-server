import { Controller, Post } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { Public } from 'src/auth/public';
import { ResponseGenerator } from 'src/core/response.render';

@Public()
@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Post()
  async create() {
    await this.seederService.create();
    return ResponseGenerator.responseGenerator(true, 'success', '00');
  }
}
