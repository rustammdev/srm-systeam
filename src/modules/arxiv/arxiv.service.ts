import { CreateArxivDto, UpdateArxivDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { ArxivModule } from './arxiv.module';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Arxiv } from './schema/arxiv.schema';

@Injectable()
export class ArxivService {
  constructor(
    private createArxivDto: CreateArxivDto,
    private updateArxivDto: UpdateArxivDto,
    @InjectModel(Arxiv.name) private arxivModel: Model<ArxivModule>,
  ) {}
}
