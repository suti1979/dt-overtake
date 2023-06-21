import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getDrivers(): Driver[] {
    const drivers = this.appService.getDrivers();
    console.log(drivers);
    return drivers;
  }

  @Post('/overtake/:id')
  overtake(@Param('id') id: number): Driver[] {
    this.appService.overtake(id);
    const currentOrder = this.appService.getDrivers();
    console.log(currentOrder);
    return currentOrder;
  }
}
