import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginData {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'the name of user' })
  userName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'the name of user' })
  password: string;
}
