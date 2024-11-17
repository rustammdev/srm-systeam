import { Controller } from '@nestjs/common';
import { ArxivService } from './arxiv.service';

@Controller('company/arxiv')
export class ArxivController {
  constructor(private arxivService: ArxivService) {}
}
