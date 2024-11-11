import { Controller } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('common')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}
}
