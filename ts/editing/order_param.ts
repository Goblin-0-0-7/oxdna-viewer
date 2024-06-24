/// <reference path="../main.ts" />

class OrderParameter {
    constructor(name: string, points: Array<OrdPoint>, vectors: Array<OrdVector>) {
    }
}

class OrdPoint {
    position: THREE.Vector3;
    nucs: Set<BasicElement>;
    constructor(nucs: Set<BasicElement>, name: string) {
        this.nucs = nucs;
    }

    calculateMeanPositino() {
        this.nucs.forEach(nuc => {
            position.add(nuc.);
        });
    }
}

class OrdVector {
    constructor(start: OrdPoint, end: OrdPoint) {
    }
}