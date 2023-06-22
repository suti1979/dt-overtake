import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/drivers')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getDrivers(): Driver[] {
    const drivers = this.appService.getDrivers();
    return drivers;
  }

  @Post()
  updateAll(@Body() drivers: Driver[]): Driver[] {
    this.appService.updateAll(drivers);
    return this.appService.getDrivers();
  }

  @Post(':id/overtake')
  overtake(@Param('id') id: number): Driver[] {
    this.appService.overtake(id);
    const currentOrder = this.appService.getDrivers();
    return currentOrder;
  }
}
