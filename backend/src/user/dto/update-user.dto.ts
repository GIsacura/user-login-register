import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  name: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  userName: string;

  @IsOptional()
  email: string;

  @IsOptional()
  password: string;
}
