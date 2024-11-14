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
import { Roles } from 'src/common/guard/decorator/roles.decorator';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { CreateTeacherDto, UpdateTeacherDto } from './dto';
import { TeacherService } from './teacher.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('company')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  //  Create teacher
  @Post('teacher')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  async createTeacher(
    @Body(new ValidationPipe()) teacherPayload: CreateTeacherDto,
    @Req() req: any,
  ) {
    const id = req.user['companyId'] ?? req.user['sub'];
    return this.teacherService.add(id, teacherPayload);
  }

  // Get teachers
  @Get('teacher')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  async getSciences(@Req() req: any) {
    const id = req.user['companyId'] ?? req.user['sub'];
    return this.teacherService.getAll(id);
  }

  // Delelet teacher - id
  @Delete('teacher/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  async delSciences(@Param('id') id: string) {
    return this.teacherService.del(id);
  }

  // Update teacher
  @Put('teacher/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  async updateTeacher(
    @Body(new ValidationPipe()) teacherPayload: UpdateTeacherDto,
    @Param('id') id: string,
  ) {
    return this.teacherService.update(id, teacherPayload);
  }
}
