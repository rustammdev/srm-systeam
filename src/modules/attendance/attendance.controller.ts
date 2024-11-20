import { Body, Controller, Param, Post, Put, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Roles } from 'src/common/guard/decorator/roles.decorator';
import { CreateStudentDto } from '../student/dto';
import { CretaAttendanceDto } from './dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Controller('company')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  // Update attendance
  @Put('attendance/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  async updateStudent(
    @Body(new ValidationPipe()) attendancePayload: UpdateAttendanceDto,
    @Param('id') id: string,
  ) {
    return this.attendanceService.update(id, attendancePayload);
  }
}
