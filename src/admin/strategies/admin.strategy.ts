import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AdminService } from '../admin.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'founder') {
  constructor(private readonly adminService: AdminService) {
    super();
  }

  async validate(username: string, password: string) {
    const authPayload = { username, password };
    const user = await this.adminService.validateAdmin(authPayload);

    if (!user) throw new UnauthorizedException('Admin not found');
    return user;
  }
}
