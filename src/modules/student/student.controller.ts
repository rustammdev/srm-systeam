import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { Roles } from 'src/common/guard/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { CreateStudentDto, updateStudentDto } from './dto';
import { PaymentService } from '../payment/payment.service';
import { AttendanceService } from '../attendance/attendance.service';
import { Types } from 'mongoose';

@Controller('company')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // Add student
  @Post('student')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  async addStudent(
    @Body(new ValidationPipe()) addStudentPayload: CreateStudentDto,
    @Req() req: any,
  ) {
    const companyId = req.user['sub'] ?? req.user['companyId'];
    const student = await this.studentService.add(companyId, addStudentPayload);
    return { student };
  }

  // get student
  @Get('student')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  async getStudentsWithoutGroup(@Req() req: any) {
    const { group } = req.query;
    const companyId = req.user['sub'] ?? req.user['companyId'];
    return this.studentService.get(companyId, group);
  }

  // Update student
  @Put('student/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  async updateStudent(
    @Body(new ValidationPipe()) studentPayload: updateStudentDto,
    @Param('id') id: string,
  ) {
    return this.studentService.update(id, studentPayload);
  }
}
