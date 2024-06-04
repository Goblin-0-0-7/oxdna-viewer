
var mut;
(function (mut) {

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

    function mutateBase(nuc){
        nuc.base = "A"
    }

    function findStrandByID(id){
        return systems[0].strands.find(s => s.id === id);
    }
})(mut || (mut = {}));