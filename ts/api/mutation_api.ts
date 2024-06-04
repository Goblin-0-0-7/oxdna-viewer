
module mut {

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