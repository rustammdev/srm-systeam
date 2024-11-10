import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Science } from './schema/science.schema';
import { Model } from 'mongoose';
import { CreateScienceDto, UpdateScienceDto } from './dto';

@Injectable()
export class ScienceService {
  constructor(@InjectModel(Science.name) private scienceModel: Model<Science>) {}

  // add science
  async add(sub: string, sciencePayload: CreateScienceDto) {
    try {
      const science = await this.scienceModel.create({
        company: sub,
        ...sciencePayload,
      });
      return science;
    } catch (error) {
      if (error.code === 11000)
        throw new HttpException('This science alredy exist.', HttpStatus.BAD_REQUEST);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // update science
  async update(id: string, sciencePayload: UpdateScienceDto) {
    try {
      const science = await this.scienceModel.findByIdAndUpdate(
        id,
        { $set: sciencePayload },
        { new: true },
      );

      if (!science)
        throw new HttpException("Science not found or does't updated.", HttpStatus.NOT_FOUND);
      return science;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // get all science
  async getAll(sub: string) {
    return await this.scienceModel.find({ company: sub });
  }

  // delete science
  async del(id: string) {
    try {
      return await this.scienceModel.deleteOne({ _id: id });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
