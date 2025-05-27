import { Cargo } from "./cargo";

export class Destination {
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