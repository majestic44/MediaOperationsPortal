
import { Controller, Get } from '@nestjs/common';

@Controller('integrations')
export class IntegrationsController {
  @Get()
  findAll() {
    return ['integrations endpoint'];
  }
}
