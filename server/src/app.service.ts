import { Injectable, NotFoundException } from '@nestjs/common';

const driversDB: Driver[] = [
  {
    id: 1,
    name: 'Lewis Hamilton',
    place: 1,
  },
  {
    id: 2,
    name: 'Valtteri Bottas',
    place: 2,
  },
  {
    id: 3,
    name: 'Max Verstappen',
    place: 3,
  },
];

@Injectable()
export class AppService {
  private readonly drivers: Driver[];
  constructor() {
    this.drivers = driversDB;
    this.shuffleDrivers();
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

    const previousDriver = this.drivers.find(
      (d) => d.place === driver.place - 1,
    );

    driver.place--;

    if (previousDriver) {
      previousDriver.place++;
    }
  }

  private shuffleDrivers(): void {
    let currentIndex = this.drivers.length;

    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.drivers[currentIndex].place, this.drivers[randomIndex].place] = [
        this.drivers[randomIndex].place,
        this.drivers[currentIndex].place,
      ];
    }
  }
}
