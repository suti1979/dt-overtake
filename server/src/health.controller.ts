// health.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller('_ah')
export class HealthController {
  @Get('health')
  healthCheck() {
    return 'OK';
  }
}
