
class MutStrand {

    uniqueID: number;
    oxDNAID: number;
    preNucs: MutNucleotide[] = [];
    nucs: MutNucleotide[] = [];
    mutationAllowed = false;
    probNick: number = 0;
    probLigate: number = 0;
    probInsert: number = 0;

    constructor(strand: Strand, baseProbs: number[]) {
        this.uniqueID = Math.floor(Math.random() * 16777215);
        this.oxDNAID = strand.id;
        let seq = strand.getSequence();
        let mutationFlags = []; // Initialize mutationFlags as an empty array
        strand.forEach(b => {
            if (b.selected) {
                this.mutationAllowed = true;
                mutationFlags.push(true);
            }
            else {
                mutationFlags.push(false);
            }
        });

        // check for same lengths
        if (seq.length != mutationFlags.length) {
            console.error("Error: Sequence and mutationFlags have different lengths");
        }

        for (let i = 0; i < seq.length; i++) {
            this.preNucs.push(new MutNucleotide(seq[i], mutationFlags[i], baseProbs));
        }
        this.nucs = this.preNucs;
    };

    mutate() {
        this.nucs.forEach(nuc => {
            if (nuc.mutationAllowed) {
                nuc.mutate();
            }
        });
    };

    getSequence() {
        let seq = "";
        this.nucs.forEach(nuc => {
            seq += nuc.base;
        });
        return seq;
    };

    updateStrand(){
        let strand = mut.findStrandByID(this.oxDNAID);
        let seq = this.getSequence();
        let i = 0;
        strand.forEach(b => {
            if (b.type != seq[i]) {
                b.changeType(seq[i]);
            };
            i++;
        });
    };
};