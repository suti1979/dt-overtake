import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { DriverDto } from './dto/driver.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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

  @Post('add')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async addDriver(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: DriverDto,
  ): Promise<Driver[]> {
    this.appService.addDriver(file, body);
    return this.appService.getDrivers();
  }
}
