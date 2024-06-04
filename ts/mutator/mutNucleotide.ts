
class MutNucleotide{

    base: string;
    mutationAllowed: boolean;
    probBases: number[] = [0.25, 0.25, 0.25, 0.25]; // A, C, G, T

    constructor(base: string, mutationAllowed: boolean, baseProbs: number[]){
        this.base = base;
        this.mutationAllowed = mutationAllowed;
        this.probBases = baseProbs;
    };

    mutate(){
        this.changeBase();
    }

    changeBase(){
        const randomNum = Math.random()
        let cumulativeProp = 0;
        let newBase = '';

        for (let i = 0; i < this.probBases.length; i++) {
            cumulativeProp += this.probBases[i];
            if (randomNum <= cumulativeProp) {
                newBase = ['A', 'C', 'G', 'T'][i];
                break;
            }
        }

        this.base = newBase;
    }

    setWeightBases(weightA: number, weightC: number, weightG: number, weightT: number){
        let totalWeight = weightA + weightC + weightG + weightT;
        if (totalWeight != 1){
            console.error("Error: Total weight of bases is not equal to 1");
        }
        else {
            this.probBases = [weightA, weightC, weightG, weightT];
        }
    }

};