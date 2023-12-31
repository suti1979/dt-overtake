import { Injectable, NotFoundException } from '@nestjs/common';
import { promisify } from 'util';
import * as fs from 'fs';
import { DriverDto } from './dto/driver.dto';

@Injectable()
export class AppService {
  private drivers: Driver[];
  constructor() {
    this.drivers = [];
    this.loadDrivers();
  }

  private async loadDrivers(): Promise<void> {
    const readFileAsync = promisify(fs.readFile);
    const filePath = 'public/drivers.json';

    try {
      const fileData = await readFileAsync(filePath, 'utf8');
      this.drivers = JSON.parse(fileData);
      this.shuffleDrivers();
    } catch (error) {
      throw new Error('Failed to load drivers from JSON file.');
    }
  }

  updateAll(drivers: Driver[]): void {
    this.drivers = drivers;
  }

  getDrivers(): Driver[] {
    return this.drivers;
  }

  overtake(id: number): void {
    const driver = this.drivers.find((driver) => driver.id === Number(id));

    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found.`);
    }

    if (driver.place === 1) {
      return;
    }

    const previousDriver = this.drivers.find((d) => d.place === driver.place - 1);

    driver.place--;

    if (previousDriver) {
      previousDriver.place++;
    }
  }

  private shuffleDrivers(): void {
    let currentIndex = this.drivers.length;

    for (let i = 0; i < this.drivers.length; i++) {
      this.drivers[i].imgUrl = `/static/${this.drivers[i].code.toLowerCase()}.png`;
      this.drivers[i].place = i + 1;
    }

    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.drivers[currentIndex].place, this.drivers[randomIndex].place] = [
        this.drivers[randomIndex].place,
        this.drivers[currentIndex].place,
      ];
    }
  }

  addDriver(file: Express.Multer.File, body: DriverDto): void {
    const newDriver = {
      id: this.drivers.length + 1,
      place: this.drivers.length + 1,
      code: 'STI',
      firstname: body.firstName,
      lastname: 'x',
      country: 'HU',
      team: 'sti',
      imgUrl: '',
    };

    console.log('FFF: ', file);
    console.log('body', body);

    newDriver.imgUrl = `/static/${file.filename}`;

    this.drivers.push(newDriver);
  }
}
