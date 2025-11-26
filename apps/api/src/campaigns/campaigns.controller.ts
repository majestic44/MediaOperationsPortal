
import { Controller, Get } from '@nestjs/common';

@Controller('campaigns')
export class CampaignsController {
  @Get()
  findAll() {
    return ['campaigns endpoint'];
  }
}
