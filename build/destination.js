"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Destination = void 0;
class Destination {
    constructor(name, distance, acceptedTypes) {
        this.name = name;
        this.distance = distance;
        this.acceptedTypes = acceptedTypes;
    }
    accepts(cargo) {
        return this.acceptedTypes.includes(cargo.classify_size());
    }
}
exports.Destination = Destination;
//# sourceMappingURL=destination.js.map