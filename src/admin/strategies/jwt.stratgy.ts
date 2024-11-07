import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import 'dotenv/config';

@Injectable()
export class JwtStrategyAdmin extends PassportStrategy(Strategy, 'admin') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_PASSWORD_ADMIN,
    });
  }

  validate(payload: any) {
    return payload;
  }
}
