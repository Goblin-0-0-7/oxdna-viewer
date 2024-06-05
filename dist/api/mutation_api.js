var mut;
(function (mut) {
    function initStrands() {
        let baseProbs = [document.getElementById('probA').valueAsNumber,
            document.getElementById('probC').valueAsNumber,
            document.getElementById('probG').valueAsNumber,
            document.getElementById('probT').valueAsNumber];
        systems[0].strands.forEach(s => {
            mutationStrands.push(new MutStrand(s, baseProbs));
        });
    }
    mut.initStrands = initStrands;
    function checkBaseProbabilities() {
        let total = document.getElementById('probA').valueAsNumber +
            document.getElementById('probC').valueAsNumber +
            document.getElementById('probG').valueAsNumber +
            document.getElementById('probT').valueAsNumber;
        if (total != 1) {
            return false;
        }
        return true;
    }
    mut.checkBaseProbabilities = checkBaseProbabilities;
    function mutateStrands() {
        if (mutationStrands.length === 0) {
            notify("Error: Strands not initialized");
            return;
        }
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
