import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiBody } from '@nestjs/swagger';
import { LoginData } from './dto/LoginData.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiBody({ type: CreateUserDto })
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('/login')
  @ApiBody({ type: LoginData })
  validate(@Body() data: LoginData) {
    return this.authService.validateUser(data.userName, data.password);
  }
}
