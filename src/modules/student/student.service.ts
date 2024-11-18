import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './schema/student.scheme';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto';
import { Payment } from '../payment/schema/payment.scheme';
import * as moment from 'moment-timezone';
import { Types } from 'mongoose';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
  ) {}

  async add(companyId: string, studentPayload: CreateStudentDto) {
    try {
      const { groupId, firstname, lastname } = studentPayload;
      const existingStudent = await this.studentModel.findOne({
        groupId: groupId, // Agar guruh ham tekshirilishi kerak bo'lsa
        firstname: firstname,
        lastname: lastname,
      });

      if (existingStudent) {
        throw new HttpException(
          "Bunday o'quvchi bu guruhda allaqachon mavjud.",
          HttpStatus.BAD_REQUEST,
        );
      }

      // Yangi o'quvchini qo'shish
      const student = await this.studentModel.create({ company: companyId, ...studentPayload });

      // Payment
      const uzbekistanTime = moment().tz('Asia/Tashkent').format('YYYY-MM-DD HH:mm:ss');
      const payment = await this.paymentModel.create({
        company: companyId,
        studentId: student._id,
        group: groupId,
        dateOfPayment: uzbekistanTime, // O'zbekiston vaqti
        status: studentPayload.paymentStatus ?? 'unpaid',
      });

      return { message: "Student ma'lumotlari muvaffaqiyatli saqlandi!", _id: student._id };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
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
}
