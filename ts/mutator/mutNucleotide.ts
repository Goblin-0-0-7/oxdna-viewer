

class MutNucleotide{

    base: string;
    mutationAllowed: boolean;

    constructor(base: string) {
        this.base = base;
    };

    setMutation(mutationAllowed: boolean){
        this.mutationAllowed = mutationAllowed;
    }

};