import { Controller } from '@nestjs/common';
import { WaitingService } from './waiting.service';

@Controller('company')
export class WaitingController {
  constructor(private waitingService: WaitingService) {}
}
