import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthRequest, RefreshRequest } from './auth';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('auth')
  doAuth(@Body() authReq: AuthRequest) {
    const token = this.authService.verify(authReq.authToken);
    const sub = this.authService.authenticate(token);
    return this.authService.getSessions()[sub];
  }

  @HttpCode(200)
  @Post('refresh')
  async doRefresh(@Body() refreshRequest: RefreshRequest) {
    const token = this.authService.verify(refreshRequest.refreshToken);
    return this.authService.refresh(token);
  }

  @HttpCode(204)
  @Post('expire')
  async doExpire(@Body() refreshRequest: RefreshRequest) {
    const token = this.authService.verify(refreshRequest.refreshToken);
    this.authService.expire(token);
  }
}
