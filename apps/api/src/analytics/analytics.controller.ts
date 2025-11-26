
import { Controller, Get } from '@nestjs/common';

@Controller('analytics')
export class AnalyticsController {
  @Get()
  findAll() {
    return ['analytics endpoint'];
  }
}
