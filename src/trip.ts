import { Cargo } from "./cargo";
import { Destination } from "./destination";
import { Gemini, Mercury, Transport } from "./transport";

export class Trip {
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