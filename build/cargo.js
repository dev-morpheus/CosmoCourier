"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiningTool = exports.OxygenTank = exports.ArmoredCapsule = exports.SupplyPack = exports.BioSample = exports.Cargo = void 0;
class Cargo {
    constructor(name, size) {
        this.name = name;
        this.size = size;
    }
    getSize() {
        return this.size;
    }
    getName() {
        return this.name;
    }
}
exports.Cargo = Cargo;
class BioSample extends Cargo {
    constructor(name) {
        super(name, BioSample.size);
    }
    classify_size() {
        return "biological samples";
    }
}
exports.BioSample = BioSample;
BioSample.size = 60;
class SupplyPack extends Cargo {
    constructor(name) {
        super(name, SupplyPack.size);
    }
    classify_size() {
        return "supply package";
    }
}
exports.SupplyPack = SupplyPack;
SupplyPack.size = 120;
class ArmoredCapsule extends Cargo {
    constructor(name) {
        super(name, ArmoredCapsule.size);
    }
    classify_size() {
        return "armored capsules";
    }
}
exports.ArmoredCapsule = ArmoredCapsule;
ArmoredCapsule.size = 250;
class OxygenTank extends Cargo {
    constructor(name) {
        super(name, OxygenTank.size);
    }
    classify_size() {
        return "oxygen tanks";
    }
}
exports.OxygenTank = OxygenTank;
OxygenTank.size = 150;
class MiningTool extends Cargo {
    constructor(name) {
        super(name, MiningTool.size);
    }
    classify_size() {
        return "mining tool";
    }
}
exports.MiningTool = MiningTool;
MiningTool.size = 220;
//# sourceMappingURL=cargo.js.map