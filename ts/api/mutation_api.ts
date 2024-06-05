
module mut {

    export function initStrands(){
        let baseProbs = [(<HTMLInputElement>document.getElementById('probA')).valueAsNumber,
                    (<HTMLInputElement>document.getElementById('probC')).valueAsNumber,
                    (<HTMLInputElement>document.getElementById('probG')).valueAsNumber,
                    (<HTMLInputElement>document.getElementById('probT')).valueAsNumber];

        systems[0].strands.forEach(s=>{
            mutationStrands.push(new MutStrand(s, baseProbs));
        });
    }

    export function checkBaseProbabilities(): boolean{
        let total = (<HTMLInputElement>document.getElementById('probA')).valueAsNumber + 
                    (<HTMLInputElement>document.getElementById('probC')).valueAsNumber + 
                    (<HTMLInputElement>document.getElementById('probG')).valueAsNumber + 
                    (<HTMLInputElement>document.getElementById('probT')).valueAsNumber;
        if (total != 1){
            return false;
        }
        return true;
    }

    export function mutateStrands(){
        if (mutationStrands.length === 0){
            notify("Error: Strands not initialized");
            return;
        }
        mutationStrands.forEach(s => {
            if (s.mutationAllowed) {
                s.mutate();
            }
        });
    }

    export function findStrandByID(id: number){
        return systems[0].strands.find(s => s.id === id);
    }
}