import { Controller, Get, Post, Param, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { User } from './user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get(':id')
  async getUser(@Param() params, @Res() response: Response) {
    try {
      const user = await this.service.getUser(params.id);
      if (user) response.send(user);
      else response.status(404).send({ message: 'user not found' });
    } catch (e) {
      console.log(e);
      response.status(400).send(e);
    }
  }

  @Post()
  async addUser(@Body() newUser: User, @Res() response: Response) {
    try {
      const id = await this.service.addUser(newUser);
      response.header('Location', `/users/${id}`);
      return response.end();
    } catch (e) {
      console.log(e);
      response.status(400).send(e);
    }
  }
}
