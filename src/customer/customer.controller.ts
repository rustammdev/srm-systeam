import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/guard/decorator/roles.decorator';
import { RolesGuard } from 'src/guard/roles.guard';
import { ModerService } from './moder.service';
import { AuthModerDto } from 'src/auth/dto';
import { CustomerService } from './customer.service';
import { CompanyDto } from 'src/admin/dto/company.dto';
import { ModerDto } from './dto/moder.dto';

@Controller('c')
export class CustomerController {
  constructor(
    private moderService: ModerService,
    private customerService: CustomerService,
  ) {}

  // add moder
  @Post('moder')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder')
  async addModer(@Body(new ValidationPipe()) moderDto: ModerDto, @Req() req: any) {
    console.log('Body', moderDto);
    const { sub } = req.user;
    return this.customerService.addModer(moderDto, req.user['sub']);
  }

  // Get all moders
  @Get('moder')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder')
  async getModers(@Req() req: any) {
    const { sub } = req.user;
    return this.customerService.getAll(sub);
    return req.user;
  }

  // Get moder
  @Get('moder/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder')
  async getModer(@Param('id') id: string) {
    return this.customerService.get(id);
  }

  // delete moder
  @Delete('moder/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder')
  async deleteModer(@Param('id') id: string) {
    return this.customerService.deleteModer(id);
  }

  @Get('status/f')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  status(@Request() req: any) {
    return req.user;
  }
}
