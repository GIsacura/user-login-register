import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { GetUsersDto } from './dto/get-user.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @Get()
  findAll(@Query() params: GetUsersDto) {
    return this.userService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body()
    data: {
      name?: string;
      lastName?: string;
      userName?: string;
      email?: string;
      password?: string;
    },
  ) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.userService.remove(id);
  }
}
