export abstract class Cargo {
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

export class BioSample extends Cargo {
    private static size = 60;

    constructor(name: string) {
        super(name, BioSample.size);
    }

    classify_size(): string {
        return "biological samples";
    }
}

export class SupplyPack extends Cargo {
    private static size = 120;

    constructor(name: string) {
        super(name, SupplyPack.size);
    }

    classify_size(): string {
        return "supply package";
    }
}

export class ArmoredCapsule extends Cargo {
    private static size = 250;

    constructor(name: string) {
        super(name, ArmoredCapsule.size);
    }

    classify_size(): string {
        return "armored capsules";
    }
}

export class OxygenTank extends Cargo {
    private static size = 150;

    constructor(name: string) {
        super(name, OxygenTank.size);
    }

    classify_size(): string {
        return "oxygen tanks";
    }
}

export class MiningTool extends Cargo {
    private static size = 220;

    constructor(name: string) {
        super(name, MiningTool.size);
    }

    classify_size(): string {
        return "mining tool";
    }
}