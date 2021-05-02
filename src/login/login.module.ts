import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        JwtModule.register(jwtConstants),
        UsersModule
    ],
    controllers: [LoginController],
    providers: [LoginService, AuthService],
    exports: [LoginService],
})
export class LoginModule {}
