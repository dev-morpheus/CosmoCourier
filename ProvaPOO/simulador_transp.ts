abstract class Cargo {
    protected name: string;
    protected size: number;

    constructor(name: string, size: number) {
        this.name = name;
        this.size = size;
    }

    getSize(): number {
        return this.size;
    }

    getName(): string {
        return this.name;
    }

    abstract classify_size(): string; 
}

class BioSample extends Cargo {
    private static size = 60;

    constructor(name: string) {
        super(name, BioSample.size);
    }

    classify_size(): string {
        return "biological samples";
    }
}

class SupplyPack extends Cargo {
    private static size = 120;

    constructor(name: string) {
        super(name, SupplyPack.size);
    }

    classify_size(): string {
        return "supply package";
    }
}

class ArmoredCapsule extends Cargo {
    private static size = 250;

    constructor(name: string) {
        super(name, ArmoredCapsule.size);
    }

    classify_size(): string {
        return "armored capsules";
    }
}

class OxygenTank extends Cargo {
    private static size = 150;

    constructor(name: string) {
        super(name, OxygenTank.size);
    }

    classify_size(): string {
        return "oxygen tanks";
    }
}

class MiningTool extends Cargo {
    private static size = 220;

    constructor(name: string) {
        super(name, MiningTool.size);
    }

    classify_size(): string {
        return "mining tool";
    }
}

class Transport {
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

class Vostok extends Transport {
    constructor(name: string) {
        super(name, 10, ["biological samples"], 15000, 10, 500);
    }
}
class Mercury extends Transport {
    constructor(name: string) {
        super(name, 20, ["biological samples", "supply package", "oxygen tanks"], 18000, 5, 1000);
    }
}
class Gemini extends Transport {
    constructor(name: string) {
        super(name, 30, ["biological samples", "supply package", "oxygen tanks", "armored capsules", "mining tool"], 20000, 4, 2000);
    }
}

class Destination {
    name: string;
    distance: number;
    acceptedTypes: string[];

    constructor(name: string, distance: number, acceptedTypes: string[]) {
        this.name = name;
        this.distance = distance;
        this.acceptedTypes = acceptedTypes;
    }

    accepts(cargo: Cargo): boolean {
        return this.acceptedTypes.includes(cargo.classify_size());
    }
}

class Trip {
    origin: string;
    destination: Destination;
    transport: Transport;
    cargo: Cargo[];

    constructor(destination: Destination, transport: Transport) {
        this.origin = "Earth"; 
        this.destination = destination;
        this.transport = transport;
        this.cargo = transport.getCargo();
    }

    startTrip(): void {
        const shipName = this.transport.name; 
        const destinationName = this.destination.name; 
        const distMillions = (this.destination.distance / 1_000_000).toFixed(0);
        const fuelBefore = this.transport.getFuelCapacity();
        const fuelNeeded = this.transport.getFuelNeeded(this.destination.distance);

        console.log(`\nMission: ${shipName} -> ${destinationName}`);

        if (!this.transport.canReach(this.destination.distance)) {
            console.log(`❌ The ${shipName} does not have enough fuel to reach ${destinationName} (${distMillions} million km).`);
            console.log(`Required: ${fuelNeeded.toFixed(1)} | Capacity: ${fuelBefore}`);
            return;
        }

        const fuelRemaining = fuelBefore - fuelNeeded;
        const capacityRemaining = this.transport.capacity - this.cargo.length;

        if (this.transport instanceof Mercury || this.transport instanceof Gemini) {
            console.log(`The ${shipName} quickly arrived at ${destinationName} (${distMillions} million km).`);
        } else {
            console.log(`The ${shipName} traveled to ${destinationName} (${distMillions} million km).`);
        }

        if (this.cargo.length === 0) {
            console.log(`The ${shipName} was not carrying any cargo.`);
        } else {
            this.cargo.forEach(c => {
                const cargoName = c.getName(); 
                const cargoType = c.classify_size(); 
                if (this.transport.canTransport(c) && this.destination.accepts(c)) {
                    console.log(`The ${shipName} delivered a "${cargoName}" (${cargoType}) to ${destinationName}.`);
                } else {
                    console.log(`The ${shipName} could not deliver the "${cargoName}" (${cargoType}): cargo not accepted by ${destinationName}.`);
                }
            });
        }

        console.log(`Fuel remaining: ${fuelRemaining.toFixed(1)} | Remaining capacity: ${capacityRemaining}`);
    }
}


function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function generateRandomCargo(): Cargo {
    const cargoClasses = [BioSample, SupplyPack, ArmoredCapsule, OxygenTank, MiningTool];
    const names = ["Zeta", "Alpha", "Beta", "Orion", "Delta"]; 
    const CargoClass = getRandomItem(cargoClasses);
    return new CargoClass(getRandomItem(names));
}

const destinations: Destination[] = [
    new Destination("Mars", 3_000_000, ["biological samples", "supply package"]),
    new Destination("Europa", 628_000_000, ["biological samples", "armored capsules"]),
    new Destination("Titan", 1_220_000_000, ["mining tool"]),
    new Destination("Ganymede", 800_000_000, ["biological samples", "supply package", "oxygen tanks", "armored capsules", "mining tool"]),
    new Destination("Venus", 160_000_000, ["biological samples", "oxygen tanks"])
];

// Simulation

const allTransports: Transport[] = [
    new Vostok("Vostok-1"),
    new Mercury("Mercury-A"),
    new Gemini("Gemini-X")
];

allTransports.forEach((transport) => {
    for (let tripCount = 1; tripCount <= 2; tripCount++) {
        transport.clearCargo();

        const numberOfCargos = Math.floor(Math.random() * 3) + 1; 
        for (let i = 0; i < numberOfCargos; i++) {
            const cargo = generateRandomCargo();
            transport.addCargo(cargo);
        }

        const destination = getRandomItem(destinations);
        const trip = new Trip(destination, transport);
        console.log(`\n🚀 Trip ${tripCount} of ship ${transport.name}`);
        trip.startTrip();
    }
});
