import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ModerStrategy extends PassportStrategy(Strategy, 'moder') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const authPayload = { username, password };
    const user = await this.authService.validateModerUser(authPayload);

    if (!user) throw new UnauthorizedException('Moderator not found');
    return user;
  }
}
