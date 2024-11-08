import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/guard/decorator/roles.decorator';
import { RolesGuard } from 'src/guard/roles.guard';

@Controller('c')
export class CustomerController {
  @Get('status/f')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  status(@Request() req: any) {
    return req.user;
  }

  @Get('status/m')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('moder')
  statu(@Request() req: any) {
    return req.user;
  }
}
