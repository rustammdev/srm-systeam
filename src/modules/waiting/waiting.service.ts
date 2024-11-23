import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWaitingDto, UpdateWaitingDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Waiting } from './schema/waiting.schema';
import { Model } from 'mongoose';

@Injectable()
export class WaitingService {
  constructor(
    private createWaitingDto: CreateWaitingDto,
    private updateWaitingDto: UpdateWaitingDto,
    @InjectModel(Waiting.name) private waitingModel: Model<Waiting>,
  ) {}

  // Get waiting
  async getWaiting(id: string) {
    return await this.waitingModel.find({ _id: id });
  }

  // Create waiting
  async create(id: string, createWaitingDto: CreateWaitingDto) {
    try {
      const { firstname, lastname } = createWaitingDto;
      const waitingIsExist = await this.waitingModel.findOne({ firstname, lastname });
      if (waitingIsExist) {
        return { message: 'waiting already exist', status: 400 };
      }

      const waiting = await this.waitingModel.findOneAndUpdate({ _id: id }, createWaitingDto, {
        new: true,
      });
      return { message: 'waiting created', waiting };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Update waiting
  async update(id: string, updateWaitingDto: UpdateWaitingDto) {
    try {
      const waiting = await this.waitingModel.findOneAndUpdate(
        { _id: id },
        { $set: updateWaitingDto },
        { new: true },
      );
      if (!waiting) {
        return { message: 'waiting not found or does not updated', status: 404 };
      }
      return { message: 'waiting updated', waiting };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Delete waiting
  async delete(id: string) {
    try {
      const waiting = await this.waitingModel.findOneAndDelete({ _id: id });

      return { message: 'waiting deleted', waiting };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
