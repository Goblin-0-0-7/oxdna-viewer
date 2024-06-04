
module mut {

    function mutateStrands(){
        mutationStrands.forEach(s => {
            if (s.mutationAllowed) {
                s.nucs.forEach(nuc => {
                    if (nuc.mutationAllowed) {
                        mutateBase(nuc);
                    }
                });
            }
        });
    }

    function mutateBase(nuc: MutNucleotide){
        nuc.base = "A"
    }

    function findStrandByID(id: number){
        return systems[0].strands.find(s => s.id === id);
    }
}