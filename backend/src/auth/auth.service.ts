import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async create(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await this.userService.create({ ...data, password: hashedPassword });
  }

  async validateUser(userName: string, password: string) {
    const userByEmail = await this.userService.findOneByEmail(userName);
    const userByUserName = await this.userService.findOneByUserName(userName);

    if (userByEmail) {
      const isMatch = await bcrypt.compare(password, userByEmail.password);

      if (isMatch) {
        const { password, ...rta } = userByEmail;
        return rta;
      }
    }

    if (userByUserName) {
      const isMatch = await bcrypt.compare(password, userByUserName.password);
      if (isMatch) {
        const { password, ...rta } = userByUserName;
        return rta;
      }
    }

    return null;
  }
}
