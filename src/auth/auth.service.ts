import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token } from './auth';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // TODO setup redis
  private readonly sessions = {};

  authenticate(token: Token): string {
    this.sessions[token.sub] = {
      accessToken: this.jwtService.sign(
        { sub: token.sub },
        {
          secret: process.env.SECRET,
          expiresIn: new Date().getTime() + 30000,
        },
      ),
      refreshToken: this.jwtService.sign(
        { sub: token.sub },
        {
          secret: process.env.SECRET,
          expiresIn: new Date().getTime() + 3000000,
        },
      ),
    };
    return token.sub;
  }

  verify(authToken: string) {
    return this.jwtService.verify(authToken, { secret: process.env.SECRET });
  }

  isExpired(accessToken: string): boolean {
    const token = this.jwtService.verify(accessToken, {
      secret: process.env.SECRET,
    });
    if (!this.sessions[token.sub]) return true;
    if (accessToken != this.sessions[token.sub].accessToken) return true;
    if (new Date() > new Date(token.exp)) {
      delete this.sessions[token.sub];
      return true;
    }
    return false;
  }

  getSessions() {
    return this.sessions;
  }

  refresh(token: Token) {
    if (!this.sessions[token.sub])
      throw new HttpException('invalid token', 403);
    this.authenticate(token);
    return this.sessions[token.sub];
  }

  expire(token: Token) {
    throw new Error('Method not implemented.');
  }
}
