import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async create(data: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const response = await this.userService.create({
        ...data,
        password: hashedPassword,
      });
      const payload = { sub: response.userInfo._id, username: data.email };
      return { ...response, jwt: await this.jwtService.signAsync(payload) };
    } catch (error) {
      return error;
    }
  }

  async validateUser(userName: string, password: string) {
    const userByEmail = await this.userService.findOneByEmail(userName);
    const userByUserName = await this.userService.findOneByUserName(userName);

    if (userByEmail) {
      const isMatch = await bcrypt.compare(password, userByEmail.password);
      const payload = { sub: userByEmail._id, username: userByEmail.email };

      if (isMatch) {
        return {
          jwt: await this.jwtService.signAsync(payload),
          ...userByEmail,
        };
      }
    }

    if (userByUserName) {
      const isMatch = await bcrypt.compare(password, userByUserName.password);
      const payload = {
        sub: userByUserName._id,
        username: userByUserName.email,
      };
      if (isMatch) {
        return {
          jwt: await this.jwtService.signAsync(payload),
          ...userByUserName,
        };
      }
    }

    return new NotFoundException('Invalid credentials');
  }
}
