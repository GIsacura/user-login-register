import { IsEmail, IsNotEmpty, IsString, Length, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'the name of user' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'the last name of user' })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'the username of user' })
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'the email of user' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(10)
  @ApiProperty({ description: 'the password of user' })
  password: string;
}
