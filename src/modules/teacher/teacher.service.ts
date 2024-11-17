import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher } from './schema/teacher.scheme';
import { Model } from 'mongoose';
import { CreateTeacherDto, UpdateTeacherDto } from './dto';

@Injectable()
export class TeacherService {
  constructor(@InjectModel(Teacher.name) private teacherModel: Model<Teacher>) {}

  // Create Teacher
  async add(companyId: string, teacherPayload: CreateTeacherDto) {
    try {
      const teacher = await this.teacherModel.create({
        company: companyId,
        ...teacherPayload,
      });
      return teacher;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // get all teacher
  async getAll(sub: string) {
    return await this.teacherModel.find({ company: sub });
  }

  // delete teacher
  async del(id: string) {
    try {
      return await this.teacherModel.deleteOne({ _id: id });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // update science
  async update(id: string, teacherPayload: UpdateTeacherDto) {
    try {
      const teacher = await this.teacherModel.findByIdAndUpdate(
        id,
        { $set: teacherPayload },
        { new: true },
      );

      if (!teacher)
        throw new HttpException("Teacher not found or doesn't updated.", HttpStatus.NOT_FOUND);
      return teacher;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
