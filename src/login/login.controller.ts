import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { ResponseGenerator as ResponseGenerator } from '../core/response.render';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/users/dto/users.dto';
import { Public } from 'src/auth/public';

@Public()
@Controller('login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req): Promise<any> {
    let user = await this.authService.login(req.user);
    return ResponseGenerator.responseGenerator(true, user, '00');
  }

  @Post('/signup')
  async SignUp(@Body() request: CreateUserDto): Promise<any> {
    let user = await this.authService.signUp(request);
    return ResponseGenerator.responseGenerator(
      !!user,
      user,
      user ? '00' : 'EmaiId already exists',
    );
  }
}
