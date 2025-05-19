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
    BioSample.size = 59;
    return BioSample;
}(Cargo));
var SupplyPack = /** @class */ (function (_super) {
    __extends(SupplyPack, _super);
    function SupplyPack(name) {
        return _super.call(this, name, SupplyPack.size) || this;
    }
    SupplyPack.size = 105;
    return SupplyPack;
}(Cargo));
var ArmoredCapsule = /** @class */ (function (_super) {
    __extends(ArmoredCapsule, _super);
    function ArmoredCapsule(name) {
        return _super.call(this, name, ArmoredCapsule.size) || this;
    }
    ArmoredCapsule.size = 251;
    return ArmoredCapsule;
}(Cargo));
var Transport = /** @class */ (function () {
    function Transport(name, capacity, level, speed, fuelConsumption) {
        this.cargos = [];
        this.name = name;
        this.capacity = capacity;
        this.level = level;
        this.speed = speed;
        this.fuelConsumption = fuelConsumption;
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
        return distance * this.fuelConsumption;
    };
    Transport.prototype.getAutonomy = function () {
        return this.capacity * 10;
    };
    Transport.prototype.canReach = function (distance) {
        return this.getFuelNeeded(distance) <= this.getAutonomy();
    };
    return Transport;
}());
var Vostok = /** @class */ (function (_super) {
    __extends(Vostok, _super);
    function Vostok(name) {
        return _super.call(this, name, 2, ["amostras biológicas"], 15000, 0.5) || this;
    }
    return Vostok;
}(Transport));
var Mercury = /** @class */ (function (_super) {
    __extends(Mercury, _super);
    function Mercury(name) {
        return _super.call(this, name, 4, ["amostras biológicas", "pacote de suprimentos", "tanques de oxigênio"], 18000, 0.7) || this;
    }
    return Mercury;
}(Transport));
var Gemini = /** @class */ (function (_super) {
    __extends(Gemini, _super);
    function Gemini(name) {
        return _super.call(this, name, 6, ["amostras biológicas", "pacote de suprimentos", "tanques de oxigênio", "cápsulas blindadas", "ferramenta de mineração"], 20000, 0.9) || this;
    }
    return Gemini;
}(Transport));
var Destination = /** @class */ (function () {
    function Destination(name, distance) {
        this.name = name;
        this.distance = distance;
    }
    return Destination;
}());
var Trip = /** @class */ (function () {
    function Trip(destination, transport) {
        this.origin = "Terra"; // fixo
        this.destination = destination;
        this.transport = transport;
        this.cargo = transport.getCargo();
    }
    Trip.prototype.startTrip = function () {
        console.log("Iniciando viagem da ".concat(this.origin, " para ").concat(this.destination.name, " com a nave ").concat(this.transport.name, "."));
        console.log("Dist\u00E2ncia: ".concat(this.destination.distance, " km"));
        console.log("Velocidade: ".concat(this.transport.speed, " km/h"));
        console.log("Consumo: ".concat(this.transport.fuelConsumption, " unidades/km"));
        console.log("Autonomia: ".concat(this.transport.getAutonomy(), " unidades"));
        var fuelNeeded = this.transport.getFuelNeeded(this.destination.distance);
        console.log("Combust\u00EDvel necess\u00E1rio: ".concat(fuelNeeded.toFixed(2), " unidades"));
        if (this.transport.canReach(this.destination.distance)) {
            console.log("✅ A missão pode ser completada com sucesso.");
        }
        else {
            console.log("❌ A missão falhará por falta de autonomia.");
        }
        console.log("Carga(s) a bordo: ".concat(this.cargo.length));
        this.cargo.forEach(function (c) {
            console.log("- ".concat(c.constructor.name, ": ").concat(c.getName(), " (").concat(c.classify_size(), ")"));
        });
    };
    return Trip;
}());
var bio = new BioSample("Cultura Zeta");
var capsule = new ArmoredCapsule("Blindada 007");
var gemini = new Gemini("Gemini-X");
gemini.addCargo(bio);
gemini.addCargo(capsule);
var mars = new Destination("Marte", 300000000);
var viagem = new Trip(mars, gemini);
viagem.startTrip();
