function getC0(A4) {
    for (let i = 0; i < 12*4 + 9; i++) {
        A4 /= 2**(1/12)
    }
    return A4;
}

export function chromaticTable(A4) {
    let frequency = getC0(A4);
    const chromaticTable = []
    const notes = ["C", "C♯/D♭", "D", "D♯/E♭", "E", "F", "F♯/G♭", "G", "G♯/A♭", "A", "A♯/B♭", "B"]
    
    for (let i = 0; i < 8; i++) {
        chromaticTable.push({})
        for (let j = 0; j < 12; j++) {
            chromaticTable[i][notes[j]] = frequency
            frequency *= 2**(1/12)
        }
    }
    
    return chromaticTable
}