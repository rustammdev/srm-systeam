import { Injectable } from '@nestjs/common';
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
}
