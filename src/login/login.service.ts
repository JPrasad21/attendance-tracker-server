import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/users.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LoginService {

    constructor(private userService: UsersService) { }

    async hashing(password: string) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash;
    }

    async checkPassword(orgPassword: string, incomingPassword: string ) {
        let result= await bcrypt.compare(orgPassword, incomingPassword)
        return result;
    }

    async login(username: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(username);
        if(user){
            return (await this.checkPassword(password, user.password)) ? user : null;
        } else {
            return null;
        }
    }

    async signUp(user: CreateUserDto) {
        try {
            user.password = await this.hashing(user.password);
            return await this.userService.create(user);   
        } catch {
            return null;
        }
    }
}
