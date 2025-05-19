var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Cargo = /** @class */ (function () {
    function Cargo(name, size) {
        this.name = name;
        this.size = size;
    }
    Cargo.prototype.getSize = function () {
        return this.size;
    };
    Cargo.prototype.getName = function () {
        return this.name;
    };
    Cargo.prototype.classify_size = function () {
        if (this.size <= 100)
            return "amostras biológicas";
        else if (this.size <= 150)
            return "pacote de suprimentos";
        else if (this.size <= 250)
            return "tanques de oxigênio";
        else if (this.size <= 350)
            return "cápsulas blindadas";
        else
            return "ferramenta de mineração";
    };
    return Cargo;
}());
var BioSample = /** @class */ (function (_super) {
    __extends(BioSample, _super);
    function BioSample(name) {
        return _super.call(this, name, BioSample.size) || this;
    }
    BioSample.size = 60;
    return BioSample;
}(Cargo));
var SupplyPack = /** @class */ (function (_super) {
    __extends(SupplyPack, _super);
    function SupplyPack(name) {
        return _super.call(this, name, SupplyPack.size) || this;
    }
    SupplyPack.size = 120;
    return SupplyPack;
}(Cargo));
var ArmoredCapsule = /** @class */ (function (_super) {
    __extends(ArmoredCapsule, _super);
    function ArmoredCapsule(name) {
        return _super.call(this, name, ArmoredCapsule.size) || this;
    }
    ArmoredCapsule.size = 250;
    return ArmoredCapsule;
}(Cargo));
var Transport = /** @class */ (function () {
    function Transport(name, capacity, level, speed, fuelConsumption, fuelCapacity) {
        this.cargos = [];
        this.name = name;
        this.capacity = capacity;
        this.level = level;
        this.speed = speed;
        this.fuelConsumption = fuelConsumption;
        this.fuelCapacity = fuelCapacity;
        this.fuelRemaining = fuelCapacity;
    }
    Transport.prototype.canTransport = function (cargo) {
        return this.level.includes(cargo.classify_size());
    };
    Transport.prototype.addCargo = function (cargo) {
        if (this.cargos.length < this.capacity && this.canTransport(cargo)) {
            this.cargos.push(cargo);
            return true;
        }
        return false;
    };
    Transport.prototype.getCargo = function () {
        return this.cargos;
    };
    Transport.prototype.getFuelNeeded = function (distance) {
        var distMilhoes = distance / 1000000;
        return distMilhoes * this.fuelConsumption;
    };
    Transport.prototype.getFuelCapacity = function () {
        return this.fuelCapacity;
    };
    Transport.prototype.canReach = function (distance) {
        return this.getFuelNeeded(distance) <= this.fuelRemaining;
    };
    Transport.prototype.useFuel = function (amount) {
        this.fuelRemaining = Math.max(0, this.fuelRemaining - amount);
    };
    Transport.prototype.getRemainingFuel = function () {
        return this.fuelRemaining;
    };
    return Transport;
}());
var Vostok = /** @class */ (function (_super) {
    __extends(Vostok, _super);
    function Vostok(name) {
        return _super.call(this, name, 10, ["amostras biológicas"], 15000, 10, 500) || this;
    }
    return Vostok;
}(Transport));
var Mercury = /** @class */ (function (_super) {
    __extends(Mercury, _super);
    function Mercury(name) {
        return _super.call(this, name, 20, ["amostras biológicas", "pacote de suprimentos", "tanques de oxigênio"], 18000, 5, 1000) || this;
    }
    return Mercury;
}(Transport));
var Gemini = /** @class */ (function (_super) {
    __extends(Gemini, _super);
    function Gemini(name) {
        return _super.call(this, name, 30, ["amostras biológicas", "pacote de suprimentos", "tanques de oxigênio", "cápsulas blindadas", "ferramenta de mineração"], 20000, 4, 2000) || this;
    }
    return Gemini;
}(Transport));
var Destination = /** @class */ (function () {
    function Destination(name, distance, acceptedTypes) {
        this.name = name;
        this.distance = distance;
        this.acceptedTypes = acceptedTypes;
    }
    Destination.prototype.accepts = function (cargo) {
        return this.acceptedTypes.includes(cargo.classify_size());
    };
    return Destination;
}());
var Trip = /** @class */ (function () {
    function Trip(destination, transport) {
        this.origin = "Terra";
        this.destination = destination;
        this.transport = transport;
        this.cargo = transport.getCargo();
    }
    Trip.prototype.startTrip = function () {
        var _this = this;
        var distMilhoes = (this.destination.distance / 1000000).toFixed(0);
        var fuelNeeded = this.transport.getFuelNeeded(this.destination.distance);
        var nomeNave = this.transport.name;
        var destino = this.destination.name;
        console.log("\nMiss\u00E3o: ".concat(nomeNave, " -> ").concat(destino));
        if (!this.transport.canReach(this.destination.distance)) {
            console.log("A ".concat(nomeNave, " n\u00E3o possui combust\u00EDvel suficiente para alcan\u00E7ar ").concat(destino, ". Miss\u00E3o abortada."));
            console.log("Combust\u00EDvel restante: ".concat(this.transport.getRemainingFuel().toFixed(1), "\n"));
            return;
        }
        this.transport.useFuel(fuelNeeded);
        if (this.cargo.length === 0) {
            console.log("A ".concat(nomeNave, " n\u00E3o transportava nenhuma carga."));
        }
        else {
            this.cargo.forEach(function (c) {
                var cargaNome = c.getName();
                var tipo = c.classify_size();
                if (_this.transport.canTransport(c) && _this.destination.accepts(c)) {
                    console.log("A ".concat(nomeNave, " entregou uma \"").concat(cargaNome, "\" a ").concat(destino, "."));
                }
                else {
                    console.log("A ".concat(nomeNave, " n\u00E3o conseguiu entregar a \"").concat(cargaNome, "\": carga n\u00E3o aceita por ").concat(destino, "."));
                }
            });
        }
        console.log("Combust\u00EDvel restante: ".concat(this.transport.getRemainingFuel().toFixed(1)));
    };
    return Trip;
}());
//SIMULAÇÃO
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function generateRandomCargo() {
    var cargoClasses = [BioSample, SupplyPack, ArmoredCapsule];
    var CargoClass = getRandomItem(cargoClasses);
    var names = ["Zeta", "Alpha", "Beta", "Orion", "Delta"];
    return new CargoClass(getRandomItem(names));
}
var destinations = [
    new Destination("Marte", 3000000, ["amostras biológicas", "pacote de suprimentos"]),
    new Destination("Europa", 628000000, ["amostras biológicas", "cápsulas blindadas"]),
    new Destination("Titã", 1220000000, ["ferramenta de mineração"]),
    new Destination("Ganimedes", 800000000, ["amostras biológicas", "pacote de suprimentos", "tanques de oxigênio", "cápsulas blindadas", "ferramenta de mineração"]),
    new Destination("Vênus", 160000000, ["amostras biológicas", "tanques de oxigênio"])
];
function generateRandomDestination() {
    return getRandomItem(destinations);
}
function generateRandomTransport() {
    var transports = [
        new Vostok("Vostok-1"),
        new Mercury("Mercury-A"),
        new Gemini("Gemini-X")
    ];
    return getRandomItem(transports);
}
for (var i = 0; i < 5; i++) {
    console.log("\n\uD83C\uDF0C Simula\u00E7\u00E3o ".concat(i + 1));
    var transport = generateRandomTransport();
    var destination = generateRandomDestination();
    for (var j = 0; j < Math.floor(Math.random() * 3) + 1; j++) {
        var cargo = generateRandomCargo();
        transport.addCargo(cargo);
    }
    var trip = new Trip(destination, transport);
    trip.startTrip();
}
var testTransport = generateRandomTransport();
var successfulAdditions = 0;
var attempts = 0;
while (successfulAdditions === 0 && attempts < 10) {
    var numCargas = Math.floor(Math.random() * 3) + 1; // entre 1 e 3
    console.log("Tentando adicionar ".concat(numCargas, " carga(s) \u00E0 nave ").concat(testTransport.name));
    for (var i = 0; i < numCargas; i++) {
        var cargo = generateRandomCargo();
        var added = testTransport.addCargo(cargo);
        if (added) {
            console.log("\u2705 Carga aceita: ".concat(cargo.getName(), " (").concat(cargo.classify_size(), ")"));
            successfulAdditions++;
        }
        else {
            console.log("\u274C Carga rejeitada: ".concat(cargo.getName(), " (").concat(cargo.classify_size(), ") incompat\u00EDvel com ").concat(testTransport.name));
        }
    }
    attempts++;
    if (successfulAdditions === 0) {
        console.log("Nenhuma carga foi aceita. Tentando novamente...\n");
    }
}
