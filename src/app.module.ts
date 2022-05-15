import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './config/database.service';
import { PaymentsController } from './payments/payments.controller';
import { PaymentsService } from './payments/payments.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [
    AppController,
    UsersController,
    PaymentsController,
    AuthController,
  ],
  providers: [
    AppService,
    DatabaseService,
    UsersService,
    PaymentsService,
    AuthService,
  ],
  exports: [AppService, DatabaseService],
})
export class AppModule {}
