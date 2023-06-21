"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const util_1 = require("util");
const fs = require("fs");
let AppService = exports.AppService = class AppService {
    constructor() {
        this.drivers = [];
        this.loadDrivers();
    }
    async loadDrivers() {
        const readFileAsync = (0, util_1.promisify)(fs.readFile);
        const filePath = 'public/drivers.json';
        try {
            const fileData = await readFileAsync(filePath, 'utf8');
            this.drivers = JSON.parse(fileData);
            this.shuffleDrivers();
        }
        catch (error) {
            throw new Error('Failed to load drivers from JSON file.');
        }
    }
    getDrivers() {
        return this.drivers;
    }
    overtake(id) {
        const driver = this.drivers.find((driver) => driver.id === Number(id));
        if (!driver) {
            throw new common_1.NotFoundException(`Driver with ID ${id} not found.`);
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
    shuffleDrivers() {
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
};
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppService);
//# sourceMappingURL=app.service.js.map