import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const header = request.header('Authorization');
    if (!header) return false;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, accessToken] = header.split(' ');
    return !this.authService.isExpired(accessToken);
  }
}
