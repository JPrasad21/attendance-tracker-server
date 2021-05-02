import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { LoginDto } from './login.Dto';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { ResponseGenerator as ResponseGenerator } from '../core/response.render';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/users/dto/users.dto';

@Controller('login')
export class LoginController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post()
    async login(@Body() request: LoginDto): Promise<any> {
        let token = this.authService.login(request);
        return ResponseGenerator.responseGenerator(true, { 'token': (await token).access_token }, '00');
    }
    
    @Post('/signup')
    async SignUp(@Body() request: CreateUserDto): Promise<any> {
        let user = await this.authService.signUp(request);
        return ResponseGenerator.responseGenerator(!!user, { user },  user ? '00' : 'EmaiId already exists');
    }

}
