import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { FounderStrategy } from './strategies/founder.stratgy';
import { ModerStrategy } from './strategies/moderStrategy';
import { JwtStrategy } from './strategies/jwt.stratgy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_PASSWORD,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, FounderStrategy, ModerStrategy, JwtStrategy],
})
export class AuthModule {}
