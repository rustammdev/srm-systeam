import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Attendance } from './schema/attendance.scheme';
import { Model } from 'mongoose';
import { CretaAttendanceDto } from './dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(@InjectModel(Attendance.name) private attendanceModel: Model<Attendance>) {}

  // update student
  async update(id: string, attendancePayload: UpdateAttendanceDto) {
    try {
      const attendance = await this.attendanceModel.findByIdAndUpdate(
        id,
        { $set: attendancePayload },
        { new: true },
      );

      if (!attendance)
        throw new HttpException(
          "O'quvchi malumotlari topilmadi yoki yangilanishda xatolik yuz berdi.",
          HttpStatus.NOT_FOUND,
        );
      return attendance;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
