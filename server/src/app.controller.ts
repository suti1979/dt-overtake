import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getDrivers(): Driver[] {
    return this.appService.getDrivers();
  }

  @Post('/overtake/:id')
  overtake(@Param('id') id: number): Driver[] {
    this.appService.overtake(id);
    return this.appService.getDrivers();
  }
}
