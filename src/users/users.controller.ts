import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get(':id')
  getUser(@Param() params) {
    console.log(params);
    return 'ok';
  }

  @Post()
  addUser(@Body() newUser) {
    console.log(newUser);
  }
}
