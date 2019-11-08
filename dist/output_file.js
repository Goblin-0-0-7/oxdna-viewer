function makeOutputFiles() {
    makeTopFile();
    makeDatFile();
}
function makeTopFile() {
    let top = []; //string of contents of .top file
    let totNuc = 0; //total # of elements
    let totStrands = 0; //total # of strands
    let longestStrandLen = 0;
    let uncorrectedStrandID;
    let oldSystem;
    let currentStrand = 1;
    for (let i = 0; i < systems.length; i++) { //for each system
        for (let j = 0; j < systems[i][strands].length; j++) { //for each strand in current system
            totStrands++;
            let strandLen = 0; //current strand length
            for (let k = 0; k < systems[i][strands][j][monomers].length; k++) { //for each nucleotide in current strand
                totNuc++;
                strandLen++;
            }
            if (longestStrandLen < strandLen) //set longestStrandLen to largest strand length
                longestStrandLen = strandLen;
        }
    }
    top.push(totNuc + " " + totStrands);
    uncorrectedStrandID = elements[0].parent.strandID;
    oldSystem = elements[0].parent.parent.systemID;
    for (let i = 0; i < elements.length; i++) { //for each nucleotide in the system
        if (elements[i].parent.strandID != uncorrectedStrandID || elements[i].parent.parent.systemID != oldSystem) {
            currentStrand += 1;
            uncorrectedStrandID = elements[i].parent.strandID;
            oldSystem = elements[i].parent.parent.systemID;
        }
        let tl = [currentStrand, elements[i].type]; //strand id in global world + base type
        let neighbor3 = elements[i].neighbor3;
        let neighbor5 = elements[i].neighbor5;
        if (neighbor3 === null || neighbor3 === undefined)
            tl.push(-1); // if no neigbor3, neighbor3's global id = -1
        else if (neighbor3 !== null)
            tl.push(neighbor3.gid); //if neighbor3 exists, append neighbor3's global id
        if (neighbor5 === null || neighbor5 === undefined)
            tl.push(-1); //if neighbor5 doesn't exist, append neighbor5's position = -1
        else
            tl.push(neighbor5.gid); //if neighbor5 exists, append neighbor5's position
        top.push(tl.join(" "));
    }
    makeTextFile("sim.top", top.join("\n")); //make .top file
}
function makeDatFile() {
    // Get largest absolute coordinate:
    let maxCoord = 0;
    for (let i = 0; i < elements.length; i++) { //for all elements
        let p = elements[i].getInstanceParameter3("cmOffsets");
        maxCoord = Math.max(maxCoord, Math.max(Math.abs(p.x), Math.abs(p.y), Math.abs(p.z)));
    }
    let tempVec = new THREE.Vector3(0, 0, 0);
    let dat = "";
    let box = Math.ceil(5 * maxCoord);
    dat = "t = 0\n" + "b = " + box + " " + box + " " + box
        + "\n" + "E = 0 0 0 " + datFileout + "\n";
    for (let i = 0; i < elements.length; i++) { //for all elements
        let nuc = elements[i];
        dat += nuc.getDatFileOutput();
    }
    makeTextFile("last_conf.dat", dat); //make .dat file
}
function det(mat) {
    return (mat[0][0] * ((mat[1][1] * mat[2][2]) - (mat[1][2] * mat[2][1])) - mat[0][1] * ((mat[1][0] * mat[2][2]) -
        (mat[2][0] * mat[1][2])) + mat[0][2] * ((mat[1][0] * mat[2][1]) - (mat[2][0] * mat[1][1])));
}
function dot(x1, y1, z1, x2, y2, z2) {
    return x1 * x2 + y1 * y2 + z1 * z2;
}
function divAndNeg(mat, divisor) {
    return [-mat[0] / divisor, -mat[1] / divisor, -mat[2] / divisor];
}
