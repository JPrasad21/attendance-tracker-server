import { Injectable } from '@nestjs/common';
import { LoginService } from 'src/login/login.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/users.dto';

@Injectable()
export class AuthService {
    constructor(
        private loginService: LoginService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.loginService.login(email, password);
        if (user) {
            const { password, ...result } = user;
            return result;
        } else {
            return null;
        }
    }

    async login(user: any) {
        const payload = { username: user.fullName, roleId: user.roleId };
        return {
            access_token: this.jwtService.sign(payload, { expiresIn: '60m' }),
        };
    }

    async signUp(user: CreateUserDto) {
        user.roleId = 1;
        return await this.loginService.signUp(user);
    }
}
