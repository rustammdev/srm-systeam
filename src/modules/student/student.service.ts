import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Payment } from '../payment/schema/payment.scheme';
import { Student } from './schema/student.scheme';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment-timezone';
import { CreateStudentDto, CretaAttendanceDto } from './dto';
import { Connection, Model } from 'mongoose';
import { Types } from 'mongoose';
import { Attendance } from '../attendance/schema/attendance.scheme';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    @InjectModel(Attendance.name) private attendanceModel: Model<Attendance>,
    @InjectConnection() private readonly connection: Connection,
  ) {}
  async add(
    companyId: string,
    studentPayload: CreateStudentDto,
  ): Promise<{ message: string; _id: Types.ObjectId }> {
    // Transaction boshlash
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const { groupId, firstname, lastname } = studentPayload;

      // 1. Mavjud studentni tekshirish
      const existingStudent = await this.studentModel
        .findOne({
          groupId,
          firstname,
          lastname,
        })
        .session(session);

      if (existingStudent) {
        throw new HttpException(
          "Bunday o'quvchi bu guruhda allaqachon mavjud.",
          HttpStatus.BAD_REQUEST,
        );
      }

      // 2. Student yaratish
      const student = await this.studentModel.create(
        [
          {
            company: new Types.ObjectId(companyId),
            ...studentPayload,
          },
        ],
        { session },
      );

      const studentId = student[0]._id;

      // 3. Attendance uchun sanani tekshirish
      const today = moment().tz('Asia/Tashkent').startOf('day');

      const existingAttendance = await this.attendanceModel
        .findOne({
          group: groupId,
          student: studentId,
          date: today.toDate(),
        })
        .session(session);

      if (existingAttendance) {
        throw new HttpException("Ushbu sanada yo'qlama allaqachon mavjud", HttpStatus.BAD_REQUEST);
      }

      // 4. Payment yaratish
      await this.paymentModel.create(
        [
          {
            company: new Types.ObjectId(companyId),
            studentId: studentId,
            group: new Types.ObjectId(groupId),
            dateOfPayment: today.format('YYYY-MM-DD HH:mm:ss'),
            status: studentPayload.paymentStatus ?? 'unpaid',
          },
        ],
        { session },
      );

      // 5. Attendance yaratish
      await this.attendanceModel.create(
        [
          {
            company: new Types.ObjectId(companyId),
            date: today.toDate(),
            group: new Types.ObjectId(groupId),
            student: studentId,
            toAttend: studentPayload.toAttend ?? false,
            description: studentPayload.description ?? '',
          },
        ],
        { session },
      );

      // Transaction ni yakunlash
      await session.commitTransaction();

      return {
        message: "Student ma'lumotlari muvaffaqiyatli saqlandi!",
        _id: studentId,
      };
    } catch (error) {
      // Xatolik bo'lsa barcha o'zgarishlarni bekor qilish
      await session.abortTransaction();

      throw new HttpException(
        error.message || "Student qo'shishda xatolik yuz berdi",
        HttpStatus.BAD_REQUEST,
      );
    } finally {
      // Session ni yopish
      session.endSession();
    }
  }

  // Qo'shimcha utility method
  private formatDate(date: Date): string {
    return moment(date).tz('Asia/Tashkent').format('YYYY-MM-DD');
  }

  // get students
  async get(company: string, groupId: string) {
    try {
      const student = await this.studentModel
        .find({ company, groupId })
        .select('_id firstname lastname phoneNumber groupId');
      return student;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Create attendance
  async createAttendance(
    companyId: string,
    attendancePayload: CretaAttendanceDto,
  ): Promise<Attendance> {
    try {
      // Joriy vaqtni UTC+5 (O'zbekiston vaqti) bilan olish
      const today = new Date();
      const uzOffset = 5; // O'zbekiston UTC+5
      const uzTime = new Date(today.getTime() + uzOffset * 60 * 60 * 1000);

      // Sanani 00:00:00 ga o'rnatish (faqat sana qismi)
      const date = new Date(Date.UTC(uzTime.getFullYear(), uzTime.getMonth(), uzTime.getDate()));

      const { group, student } = attendancePayload;

      // Mavjud yo'qlamani tekshirish
      const existingAttendance = await this.attendanceModel.findOne({
        group,
        date,
      });

      if (existingAttendance) {
        throw new HttpException("Ushbu sanada yo'qlama allaqachon mavjud", HttpStatus.BAD_REQUEST);
      }

      // Yangi yo'qlama yaratish
      const attendance = await this.attendanceModel.create({
        company: companyId,
        date,
        group,
        student,
      });

      return attendance;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
