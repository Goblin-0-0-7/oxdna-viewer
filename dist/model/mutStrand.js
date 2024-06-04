
class MutStrand {

    uniqueID;
    oxDNAID;
    preNucs;
    preNucs = [];
    nucs = [];
    mutationAllowed = false;

    constructor(strand) {
        this.uniqueID = Math.floor(Math.random() * 16777215);
        this.oxDNAID = strand.id;
        let seq = strand.getSequence();
        let mutationFlags = []; // Initialize mutationFlags as an empty array
        strand.forEach(b => {
            if (b.selected) {
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
            this.preNucs.push(new MutNucleotide(seq[i], mutationFlags[i]));
        }
        this.nucs = this.preNucs;
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
                b.setType(seq[i]);
            };
            i++;
        });
    };
};