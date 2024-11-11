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
import { TeacherService } from './teacher.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Roles } from 'src/common/guard/decorator/roles.decorator';
import { CreateTeacherDto, UpdateTeacherDto } from './dto';

@Controller('company')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  //  Create group
  @Post('teacher')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  async createTeacher(
    @Body(new ValidationPipe()) teacherPayload: CreateTeacherDto,
    @Req() req: any,
  ) {
    const { sub } = req.user;
    return this.teacherService.add(sub, teacherPayload);
  }

  // Get teachers
  @Get('teacher')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  async getSciences(@Req() req: any) {
    const { sub } = req.user;
    return this.teacherService.getAll(sub);
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
