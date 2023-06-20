export declare class AppService {
    private readonly drivers;
    constructor();
    getDrivers(): Driver[];
    overtake(id: number): void;
    private shuffleDrivers;
}
