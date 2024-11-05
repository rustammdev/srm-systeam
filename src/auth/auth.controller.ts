import { Body, Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthModerDto, AuthSchoolDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('founder')
  loginFounder(@Body() authPayload: AuthSchoolDto) {
    return this.authService.validateFounderUser(authPayload);
  }

  @Get('moder')
  loginModer(@Body() authPayload: AuthModerDto) {
    return this.authService.validateModerUser(authPayload);
  }
}
