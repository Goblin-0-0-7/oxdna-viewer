var mut;
(function (mut) {
    function mutateStrands() {
        mutationStrands.forEach(s => {
            if (s.mutationAllowed) {
                s.mutate();
            }
        });
    }
    mut.mutateStrands = mutateStrands;
    function findStrandByID(id) {
        return systems[0].strands.find(s => s.id === id);
    }
    mut.findStrandByID = findStrandByID;
})(mut || (mut = {}));
