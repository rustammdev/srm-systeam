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
import { ScienceService } from './science.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Roles } from 'src/common/guard/decorator/roles.decorator';
import { CreateScienceDto, UpdateScienceDto } from './dto';

@Controller('company')
export class ScienceController {
  constructor(private scienceService: ScienceService) {}

  // Create science
  @Post('scince')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  async addScience(@Body(new ValidationPipe()) sciencePayload: CreateScienceDto, @Req() req: any) {
    const id = req.user['companyId'] ?? req.user['sub'];
    return this.scienceService.add(id, sciencePayload);
  }

  // Get sciences
  @Get('scince')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  async getSciences(@Req() req: any) {
    const id = req.user['companyId'] ?? req.user['sub'];
    return this.scienceService.getAll(id);
  }

  // Update science
  @Put('scince/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  async updateScience(
    @Body(new ValidationPipe()) sciencePayload: UpdateScienceDto,
    @Param('id') id: string,
  ) {
    return this.scienceService.update(id, sciencePayload);
  }

  // Delelet science - id
  @Delete('scince/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  async delSciences(@Param('id') id: string) {
    return this.scienceService.del(id);
  }
}
