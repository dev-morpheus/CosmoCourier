class Cargo {
    protected name: string;
    protected size: number;
    constructor(name: string, size: number){
        this.name = name;
        this.size = size;
    }

    getSize(): number {
        return this.size;
    }

    getName(): string {
        return this.name;
    }

    classify_size(): string {
        if (this.size <= 100) return "amostras biológicas";
        else if (this.size <= 150) return "pacote de suprimentos";
        else if (this.size <= 250) return "tanques de oxigênio";
        else if (this.size <= 350) return "cápsulas blindadas";
        else return "ferramenta de mineração";
    }
}

class BioSample extends Cargo {
    private static size = 60;
    constructor(name: string) {
        super(name, BioSample.size);
    }
}

class SupplyPack extends Cargo {
    private static size = 120;
    constructor(name: string) {
        super(name, SupplyPack.size);
    }
}

class ArmoredCapsule extends Cargo {
    private static size = 250;
    constructor(name: string) {
        super(name, ArmoredCapsule.size);
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
    private fuelRemaining: number;

    constructor(name: string, capacity: number, level: string[], speed: number, fuelConsumption: number, fuelCapacity: number) {
        this.name = name;
        this.capacity = capacity;
        this.level = level;
        this.speed = speed;
        this.fuelConsumption = fuelConsumption;
        this.fuelCapacity = fuelCapacity;
        this.fuelRemaining = fuelCapacity;
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
    
    getFuelNeeded(distance: number): number {
        const distMilhoes = distance / 1_000_000;
        return distMilhoes * this.fuelConsumption;
    }

    getFuelCapacity(): number {
        return this.fuelCapacity;
    }

    canReach(distance: number): boolean {
        return this.getFuelNeeded(distance) <= this.fuelRemaining;
    }   

    useFuel(amount: number): void {
        this.fuelRemaining = Math.max(0, this.fuelRemaining - amount);
    }

    getRemainingFuel(): number {
        return this.fuelRemaining;
    }
}

class Vostok extends Transport {
    constructor(name: string) {
        super(name, 10, ["amostras biológicas"], 15000, 10, 500); 
    }
}
class Mercury extends Transport {
    constructor(name: string) {
        super(name, 20, ["amostras biológicas", "pacote de suprimentos", "tanques de oxigênio"], 18000, 5, 1000);
    }
}
class Gemini extends Transport {
    constructor(name: string) {
        super(name, 30, ["amostras biológicas", "pacote de suprimentos", "tanques de oxigênio", "cápsulas blindadas", "ferramenta de mineração"], 20000, 4, 2000);
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
        this.origin = "Terra";
        this.destination = destination;
        this.transport = transport;
        this.cargo = transport.getCargo();
    }

    startTrip(): void {
        const distMilhoes = (this.destination.distance / 1_000_000).toFixed(0);
        const fuelNeeded = this.transport.getFuelNeeded(this.destination.distance);

        const nomeNave = this.transport.name;
        const destino = this.destination.name;

        console.log(`\nMissão: ${nomeNave} -> ${destino}`);

        if (!this.transport.canReach(this.destination.distance)) {
            console.log(`A ${nomeNave} não possui combustível suficiente para alcançar ${destino}. Missão abortada.`);
            console.log(`Combustível restante: ${this.transport.getRemainingFuel().toFixed(1)}
`);
            return;
        }

        this.transport.useFuel(fuelNeeded);

        if (this.cargo.length === 0) {
            console.log(`A ${nomeNave} não transportava nenhuma carga.`);
        } else {
            this.cargo.forEach(c => {
                const cargaNome = c.getName();
                const tipo = c.classify_size();
                if (this.transport.canTransport(c) && this.destination.accepts(c)) {
                    console.log(`A ${nomeNave} entregou uma "${cargaNome}" a ${destino}.`);
                } else {
                    console.log(`A ${nomeNave} não conseguiu entregar a "${cargaNome}": carga não aceita por ${destino}.`);
                }
            });
        }

        console.log(`Combustível restante: ${this.transport.getRemainingFuel().toFixed(1)}`);
    }
}




//SIMULAÇÃO

function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}
function generateRandomCargo(): Cargo {
    const cargoClasses = [BioSample, SupplyPack, ArmoredCapsule];
    const CargoClass = getRandomItem(cargoClasses);
    const names = ["Zeta", "Alpha", "Beta", "Orion", "Delta"];
    return new CargoClass(getRandomItem(names));
}

const destinations: Destination[] = [
    new Destination("Marte", 3000000, ["amostras biológicas", "pacote de suprimentos"]),
    new Destination("Europa", 628000000, ["amostras biológicas", "cápsulas blindadas"]),
    new Destination("Titã", 1220000000, ["ferramenta de mineração"]),
    new Destination("Ganimedes", 800000000, ["amostras biológicas", "pacote de suprimentos", "tanques de oxigênio", "cápsulas blindadas", "ferramenta de mineração"]),
    new Destination("Vênus", 160000000, ["amostras biológicas", "tanques de oxigênio"])
];
function generateRandomDestination(): Destination {
    return getRandomItem(destinations);
}
function generateRandomTransport(): Transport {
    const transports = [
        new Vostok("Vostok-1"),
        new Mercury("Mercury-A"),
        new Gemini("Gemini-X")
    ];
    return getRandomItem(transports);
}

for (let i = 0; i < 5; i++) {
    console.log(`\n🌌 Simulação ${i + 1}`);
    const transport = generateRandomTransport();
    const destination = generateRandomDestination();

    for (let j = 0; j < Math.floor(Math.random() * 3) + 1; j++) {
        const cargo = generateRandomCargo();
        transport.addCargo(cargo);
    }

    const trip = new Trip(destination, transport);
    trip.startTrip();
}

const testTransport = generateRandomTransport();
let successfulAdditions = 0;
let attempts = 0;

while (successfulAdditions === 0 && attempts < 10) {
    const numCargas = Math.floor(Math.random() * 3) + 1; // entre 1 e 3
    console.log(`Tentando adicionar ${numCargas} carga(s) à nave ${testTransport.name}`);
    
    for (let i = 0; i < numCargas; i++) {
        const cargo = generateRandomCargo();
        const added = testTransport.addCargo(cargo);
        if (added) {
            console.log(`✅ Carga aceita: ${cargo.getName()} (${cargo.classify_size()})`);
            successfulAdditions++;
        } else {
            console.log(`❌ Carga rejeitada: ${cargo.getName()} (${cargo.classify_size()}) incompatível com ${testTransport.name}`);
        }
    }

    attempts++;
    if (successfulAdditions === 0) {
        console.log("Nenhuma carga foi aceita. Tentando novamente...\n");
    }
}
