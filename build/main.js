"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cargo_1 = require("./cargo");
const destination_1 = require("./destination");
const transport_1 = require("./transport");
const trip_1 = require("./trip");
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function generateRandomCargo() {
    const cargoClasses = [cargo_1.BioSample, cargo_1.SupplyPack, cargo_1.ArmoredCapsule, cargo_1.OxygenTank, cargo_1.MiningTool];
    const names = ["Zeta", "Alpha", "Beta", "Orion", "Delta"];
    const CargoClass = getRandomItem(cargoClasses);
    return new CargoClass(getRandomItem(names));
}
const destinations = [
    new destination_1.Destination("Mars", 300000, ["biological samples", "supply package"]),
    new destination_1.Destination("Europa", 62800000, ["biological samples", "armored capsules"]),
    new destination_1.Destination("Titan", 122000000, ["mining tool"]),
    new destination_1.Destination("Ganymede", 80000000, ["biological samples", "supply package", "oxygen tanks", "armored capsules", "mining tool"]),
    new destination_1.Destination("Venus", 16000000, ["biological samples", "oxygen tanks"])
];
const allTransports = [
    new transport_1.Vostok("Vostok-1"),
    new transport_1.Mercury("Mercury-A"),
    new transport_1.Gemini("Gemini-X")
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
        const trip = new trip_1.Trip(destination, transport);
        console.log(`\n🚀 Trip ${tripCount} of ship ${transport.name}`);
        trip.startTrip();
    }
});
//# sourceMappingURL=main.js.map