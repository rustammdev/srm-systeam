import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { WaitingService } from './waiting.service';
import { CreateWaitingDto, UpdateWaitingDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Roles } from 'src/common/guard/decorator/roles.decorator';

@Controller('company')
export class WaitingController {
  constructor(private waitingService: WaitingService) {}
  // get waiting
  @Get('waiting')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  async getWaiting(
    @Body(new ValidationPipe()) createWaitingDto: CreateWaitingDto,
    @Req() req: any,
  ) {
    const id = req.user['sub'] ?? req.user['companyId'];
    return this.waitingService.getWaiting(id);
  }

  // create waiting
  @Post('waiting')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  async createWaiting(
    @Body(new ValidationPipe()) createWaitingPayload: CreateWaitingDto,
    @Req() req: any,
  ) {
    const id = req.user['sub'] ?? req.user['companyId'];
    return this.waitingService.create(id, createWaitingPayload);
  }

  // update waiting
  @Put('waiting/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  async updateWaiting(
    @Body(new ValidationPipe()) updateWaitingPayload: UpdateWaitingDto,
    @Param('id') id: string,
  ) {
    return this.waitingService.update(id, updateWaitingPayload);
  }

  // delete waiting
  @Delete('waiting/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  async deleteWaiting(@Param('id') id: string) {
    return this.waitingService.delete(id);
  }
}
