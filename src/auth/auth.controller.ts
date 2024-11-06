import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthModerDto, AuthCompanyDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard('founder'))
  @Post('login/founder')
  loginFounder(@Body(new ValidationPipe()) authPayload: AuthCompanyDto) {
    return this.authService.validateFounderUser(authPayload);
  }

  // @UseGuards(AuthGuard('moder'))
  @Post('login/moder')
  loginModer(@Body(new ValidationPipe()) authPayload: AuthModerDto) {
    return this.authService.validateModerUser(authPayload);
  }

  @Get('status')
  @UseGuards(AuthGuard('jwt'))
  status(@Request() req: any) {
    return req.user;
  }
}
