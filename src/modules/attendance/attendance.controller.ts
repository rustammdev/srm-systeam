import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Roles } from 'src/common/guard/decorator/roles.decorator';
import { CreateStudentDto } from '../student/dto';
import { CretaAttendanceDto } from './dto';

@Controller('company')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  // // Add atttendance
  // @Post('attendance')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles('founder', 'moder')
  // async addStudent(
  //   @Body(new ValidationPipe()) attendancePayload: CretaAttendanceDto,
  //   @Req() req: any,
  // ) {
  //   const companyId = req.user['sub'] ?? req.user['companyId'];
  //   const attendance = await this.attendanceService.create(companyId, attendancePayload);
  //   return attendance;
  // }
}
