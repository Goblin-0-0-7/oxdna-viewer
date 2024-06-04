class MutStrand {
    uniqueID;
    oxDNAID;
    preNucs = [];
    nucs = [];
    mutationAllowed = false;
    propNick = 0;
    propLigate = 0;
    propInsert = 0;
    constructor(strand) {
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
            this.preNucs.push(new MutNucleotide(seq[i], mutationFlags[i]));
        }
        this.nucs = this.preNucs;
    }
    ;
    mutate() {
        this.nucs.forEach(nuc => {
            if (nuc.mutationAllowed) {
                nuc.mutate();
            }
        });
    }
    ;
    getSequence() {
        let seq = "";
        this.nucs.forEach(nuc => {
            seq += nuc.base;
        });
        return seq;
    }
    ;
    updateStrand() {
        let strand = mut.findStrandByID(this.oxDNAID);
        let seq = this.getSequence();
        let i = 0;
        strand.forEach(b => {
            if (b.type != seq[i]) {
                b.changeType(seq[i]);
            }
            ;
            i++;
        });
    }
    ;
}
;
