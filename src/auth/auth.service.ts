import { Injectable } from '@nestjs/common';
import { LoginService } from 'src/login/login.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/users.dto';
import { User } from 'src/users/schema/users.schema';

@Injectable()
export class AuthService {
    constructor(
        private loginService: LoginService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.loginService.login(username, password);
        if (user) {
            const { password, ...result } = user;
            return result;
        } else {
            return null;
        }
    }

    async login(user: any) {
        const {_id, fullName, role, email} = user._doc;
        let userObj = {
            fullName,
            role,
            email,
            _id
        }
        let token = this.jwtService.sign(userObj, { expiresIn: '60m' });
        userObj['token'] = token;
        return userObj;
    }

    async signUp(user: CreateUserDto) {
        user.role = "Teacher";
        return await this.loginService.signUp(user);
    }
}
