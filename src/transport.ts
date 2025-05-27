import { Cargo } from "./cargo";

export class Transport {
    name: string;
    capacity: number;
    level: string[]; 
    speed: number;
    fuelConsumption: number;
    fuelCapacity: number;
    private cargos: Cargo[] = [];

    constructor(name: string, capacity: number, level: string[], speed: number, fuelConsumption: number, fuelCapacity: number) {
        this.name = name;
        this.capacity = capacity;
        this.level = level;
        this.speed = speed;
        this.fuelConsumption = fuelConsumption;
        this.fuelCapacity = fuelCapacity;
    }

    canTransport(cargo: Cargo): boolean {
        return this.level.includes(cargo.classify_size());
    }

    addCargo(cargo: Cargo): boolean {
        if (this.cargos.length < this.capacity && this.canTransport(cargo)) {
            this.cargos.push(cargo);
            return true;
        }
        return false;
    }

    getCargo(): Cargo[] {
        return this.cargos;
    }

    clearCargo(): void {
        this.cargos = [];
    }

    getFuelNeeded(distance: number): number {
        const distMillions = distance / 1_000_000;
        return distMillions * this.fuelConsumption;
    }

    getFuelCapacity(): number {
        return this.fuelCapacity;
    }

    canReach(distance: number): boolean {
        return this.getFuelNeeded(distance) <= this.getFuelCapacity();
    }
}

export class Vostok extends Transport {
    constructor(name: string) {
        super(name, 10, ["biological samples"], 15000, 10, 500);
    }
}
export class Mercury extends Transport {
    constructor(name: string) {
        super(name, 20, ["biological samples", "supply package", "oxygen tanks"], 18000, 5, 1000);
    }
}
export class Gemini extends Transport {
    constructor(name: string) {
        super(name, 30, ["biological samples", "supply package", "oxygen tanks", "armored capsules", "mining tool"], 20000, 4, 2000);
    }
}
