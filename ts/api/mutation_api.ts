
module mut {

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