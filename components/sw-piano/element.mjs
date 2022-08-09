import template from './template.mjs';

const chromaticTable = (() => {
    let frequency = 16.054296052536703 // C0
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
})();

//console.log(chromaticTable)

export class SwPiano extends HTMLElement {
    static get treble() {
        return ['C4', 'C4♯', 'D4', 'D4♯', 'E4', 'F4', 'F4♯', 'G4', 'G4♯', 'A4', 'A4♯', 'B4', 'C5', 'C5♯', 'D5', 'D5♯', 'E5', 'F5', 'F5♯', 'G5', 'G5♯', 'A5', 'A5♯', 'B5', 'C6'];
    }

    static get bass() {
        return ['C2', 'D2♭', 'D2', 'E2♭', 'E2', 'F2', 'G2♭', 'G2', 'A2♭', 'A2', 'B2♭', 'B2', 'C3', 'D3♭', 'D3', 'E3♭', 'E3', 'F3', 'G3♭', 'G3', 'A3♭', 'A3', 'B3♭', 'B3', 'C4'];
    }

    static frequencyFromKey(key) {
        const accidental = key[2] ? key[2] : "";
        const note = key[0] + accidental;
        const octave = key[1];

        const enharmonicNotes = {
            "C♯": "C♯/D♭",
            "D♭": "C♯/D♭",
            "D♯": "D♯/E♭",
            "E♭": "D♯/E♭",
            "F♯": "F♯/G♭",
            "G♭": "F♯/G♭",
            "G♯": "G♯/A♭",
            "A♭": "G♯/A♭",
            "A♯": "A♯/B♭",
            "B♭": "A♯/B♭"
        };

        return chromaticTable[octave][enharmonicNotes[note] ? enharmonicNotes[note] : note];
    }

    static aslFromKey(key) {
        const accidental = key[2] ? key[2] : "";
        const note = key[0] + accidental;
        const octave = key[1];

        const enharmonicNotes = {
            "C♯": "C♯/D♭",
            "D♭": "C♯/D♭",
            "D♯": "D♯/E♭",
            "E♭": "D♯/E♭",
            "F♯": "F♯/G♭",
            "G♭": "F♯/G♭",
            "G♯": "G♯/A♭",
            "A♭": "G♯/A♭",
            "A♯": "A♯/B♭",
            "B♭": "A♯/B♭"
        };

        return chromaticTable[octave][enharmonicNotes[note] ? enharmonicNotes[note] : note];
    }

    static get instruments() {
        return {
            piano: {
                treble: SwPiano.treble,
                bass: SwPiano.bass
            },
            keyboard: {
                treble: ['z', 's', 'x', 'd', 'c', 'v', 'g', 'b', 'h', 'n', 'j', 'm', ',|q', 'l|2', '.|w', ';|3', '/|e', 'r', '5', 't', '6', 'y', '7', 'u', 'i'],
                bass: ['z', 's', 'x', 'd', 'c', 'v', 'g', 'b', 'h', 'n', 'j', 'm', ',|q', 'l|2', '.|w', ';|3', '/|e', 'r', '5', 't', '6', 'y', '7', 'u', 'i'],
            },
            midi: {
                treble: ['60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84'],
                bass: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60']
            },
            voice: { //TODO: add solfege
                treble: SwPiano.treble.map(key => Math.round(SwPiano.frequencyFromKey(key))),
                bass: SwPiano.bass.map(key => Math.round(SwPiano.frequencyFromKey(key)))
            },
            ASL: {
                treble: [],
                bass: []
            }
        };
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.render('voice', 'bass');
    }

    render(instrument, clef) {
        const ul = this.shadowRoot.querySelector('ul');
        ul.replaceChildren();
        SwPiano.instruments[instrument][clef].forEach(key => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            //span.innerHTML = key; // required for html entities
            span.append(key);
            li.append(span);
            ul.append(li);
        });
    }
    
}

// https://commons.wikimedia.org/wiki/File:Sign_language_Z.svg