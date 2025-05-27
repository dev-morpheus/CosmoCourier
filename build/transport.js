"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gemini = exports.Mercury = exports.Vostok = exports.Transport = void 0;
class Transport {
    constructor(name, capacity, level, speed, fuelConsumption, fuelCapacity) {
        this.cargos = [];
        this.name = name;
        this.capacity = capacity;
        this.level = level;
        this.speed = speed;
        this.fuelConsumption = fuelConsumption;
        this.fuelCapacity = fuelCapacity;
    }
    canTransport(cargo) {
        return this.level.includes(cargo.classify_size());
    }
    addCargo(cargo) {
        if (this.cargos.length < this.capacity && this.canTransport(cargo)) {
            this.cargos.push(cargo);
            return true;
        }
        return false;
    }
    getCargo() {
        return this.cargos;
    }
    clearCargo() {
        this.cargos = [];
    }
    getFuelNeeded(distance) {
        const distMillions = distance / 1_000_000;
        return distMillions * this.fuelConsumption;
    }
    getFuelCapacity() {
        return this.fuelCapacity;
    }
    canReach(distance) {
        return this.getFuelNeeded(distance) <= this.getFuelCapacity();
    }
}
exports.Transport = Transport;
class Vostok extends Transport {
    constructor(name) {
        super(name, 10, ["biological samples"], 15000, 10, 500);
    }
}
exports.Vostok = Vostok;
class Mercury extends Transport {
    constructor(name) {
        super(name, 20, ["biological samples", "supply package", "oxygen tanks"], 18000, 5, 1000);
    }
}
exports.Mercury = Mercury;
class Gemini extends Transport {
    constructor(name) {
        super(name, 30, ["biological samples", "supply package", "oxygen tanks", "armored capsules", "mining tool"], 20000, 4, 2000);
    }
}
exports.Gemini = Gemini;
//# sourceMappingURL=transport.js.map