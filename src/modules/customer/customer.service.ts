import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthModerDto } from 'src/auth/dto';
import * as bcrypt from 'bcryptjs';
import { ModerDto } from './dto/moder.dto';
import path from 'node:path/win32';
import { Moder } from './schema/moder.scheme';

@Injectable()
export class CustomerService {
  constructor(@InjectModel(Moder.name) private moderModel: Model<Moder>) {}

  // add moderator
  async addModer({ username, password }: ModerDto, company: string) {
    try {
      // Moder mavjud ekanligiga tekshirish
      const admin = await this.moderModel.findOne({ username });
      if (admin) {
        throw new HttpException('This username already exists.', HttpStatus.CONFLICT);
      }

      if (password.length < 6) {
        throw new HttpException('Password too short', HttpStatus.BAD_REQUEST);
      }

      const hash = await bcrypt.hash(password, 10);
      await this.moderModel.create({ username, password: hash, company });

      return { message: 'Moder added!', username };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Get all moders in spesific company
  async getAll(companyId: string) {
    const moder = await this.moderModel
      .find({ company: companyId })
      .select('_id username company createdAt')
      .populate({ path: 'company', select: 'companyName status createdAt' });
    return moder;
  }

  // Get moder unique id
  async get(id: string) {
    const moder = await this.moderModel
      .find({ _id: id })
      .select('_id username company createdAt ')
      .populate({ path: 'company', select: 'companyName status createdAt' });
    return moder;
  }

  // delete moder
  async deleteModer(id: string) {
    const moder = await this.moderModel.findByIdAndDelete(id);
    return moder;
  }
}
