import { Arxiv, ArxivSchema } from './schema/arxiv.schema';
import { ArxivController } from './arxiv.controller';
import { ArxivService } from './arxiv.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [MongooseModule.forFeature([{ name: Arxiv.name, schema: ArxivSchema }])],
  controllers: [ArxivController],
  providers: [ArxivService],
})
export class ArxivModule {}
