import { Strand } from '../model/strand'; // Add import statement for 'Strand' class

class MutStrand {

    uniqueID: number;
    oxDNAID: number;
    preBases: MutNucleotide[];
    bases: MutNucleotide[];
    mutationAllowed: boolean = false;

    constructor(strand: Strand) {
        this.uniqueID = Math.floor(Math.random() * 16777215);
        this.oxDNAID = strand.id;
        let seq: string = strand.getSequence();
        for (let i = 0; i < seq.length; i++) {
            this.preBases.push(new MutNucleotide(seq[i]));
        }
    };

};