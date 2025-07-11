import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../create-user.dto';
import { User } from '../user.entity';
import { PasswordService } from '../password/password.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly passwordService: PasswordService,
    ) { }

    public async register(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.userService.findOneByEmail(createUserDto.email)

        if (existingUser) {
            throw new ConflictException('Email already exists')
        }

        const user = await this.userService.createUser(createUserDto);

        // 1)return the user
        // 2)return the user & token
        // 2)return token
        return user;
    }

    public async login(email: string, password: string): Promise<string> {
        const user = await this.userService.findOneByEmail(email)

        // 1) There no such user
        // 2) Password is invalid

        if (!user || !(await this.passwordService.verify(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials')
        }


        return this.generateToken(user)

    }

    private generateToken(user: User): string {
        const payload = {
            sub: user.id,
            name: user.name,
            roles: user.roles,
        }
        return this.jwtService.sign(payload)
    }

}

// 1) User registration
// - Make sure dose not exist
// - Store the user
// -(optional) generate the token
// 2) Generating the token 
