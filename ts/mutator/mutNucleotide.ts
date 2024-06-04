
class MutNucleotide{

    base: string;
    mutationAllowed: boolean;
    propBases: number[] = [0.25, 0.25, 0.25, 0.25]; // A, C, G, T

    constructor(base: string, mutationAllowed: boolean){
        this.base = base;
        this.mutationAllowed = mutationAllowed;
    };

    mutate(){
        this.changeBase();
    }

    changeBase(){
        const randomNum = Math.random()
        let cumulativeProp = 0;
        let newBase = '';

        for (let i = 0; i < this.propBases.length; i++) {
            cumulativeProp += this.propBases[i];
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
            this.propBases = [weightA, weightC, weightG, weightT];
        }
    }

};