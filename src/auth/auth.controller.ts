import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthModerDto, AuthCompanyDto } from './dto/index';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login/company')
  loginFounder(@Body(new ValidationPipe()) authPayload: AuthCompanyDto) {
    return this.authService.validateFounderUser(authPayload);
  }

  @Post('login/moder')
  loginModer(@Body(new ValidationPipe()) authPayload: AuthModerDto) {
    console.log(authPayload);
    return this.authService.validateModerUser(authPayload);
  }

  @Get('status')
  @UseGuards(AuthGuard('jwt'))
  status(@Request() req: any) {
    return req.user;
  }
}
