import { ArmoredCapsule, BioSample, Cargo, MiningTool, OxygenTank, SupplyPack } from "./cargo";
import { Destination } from "./destination";
import { Gemini, Mercury, Transport, Vostok } from "./transport";
import { Trip } from "./trip";

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
    new Destination("Mars", 300000, ["biological samples", "supply package"]),
    new Destination("Europa", 62800000, ["biological samples", "armored capsules"]),
    new Destination("Titan", 122000000, ["mining tool"]),
    new Destination("Ganymede", 80000000, ["biological samples", "supply package", "oxygen tanks", "armored capsules", "mining tool"]),
    new Destination("Venus", 16000000, ["biological samples", "oxygen tanks"])
];


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