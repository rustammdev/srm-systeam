import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthModerDto } from 'src/auth/dto';
import { Moder } from 'src/schema/moder.scheme';
import * as bcrypt from 'bcryptjs';
import { ModerDto } from './dto/moder.dto';

@Injectable()
export class CustomerService {
  constructor(@InjectModel(Moder.name) private moderModel: Model<Moder>) {}

  // add moderator
  async addModer({ username, password }: ModerDto, company: string) {
    try {
      return { username, password, company };
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

      return { message: 'Moder added!', username: 'username' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
