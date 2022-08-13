import template from './template.mjs';

export class SwPiano extends HTMLElement {
    static #treble = ['C4', 'C4♯', 'D4', 'D4♯', 'E4', 'F4', 'F4♯', 'G4', 'G4♯', 'A4', 'A4♯', 'B4', 'C5', 'C5♯', 'D5', 'D5♯', 'E5', 'F5', 'F5♯', 'G5', 'G5♯', 'A5', 'A5♯', 'B5', 'C6'];
    static #bass = ['C2', 'D2♭', 'D2', 'E2♭', 'E2', 'F2', 'G2♭', 'G2', 'A2♭', 'A2', 'B2♭', 'B2', 'C3', 'D3♭', 'D3', 'E3♭', 'E3', 'F3', 'G3♭', 'G3', 'A3♭', 'A3', 'B3♭', 'B3', 'C4'];

    static #chromaticTable = (() => {
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

    //https://en.wikipedia.org/wiki/Solf%C3%A8ge#:~:text=There%20are%20two%20current%20ways,degree%20of%20the%20major%20scale.
    static #solfegeFromKey(key) { 
        const accidental = key[2] ? key[2] : "";
        const note = key[0] + accidental;
        const octave = key[1];

        const solfege = {
            C: "Do",
            "C♯": "Di",
            "D♭": "Ra",
            D: "Re",
            "D♯": "Ri",
            "E♭": "Ma", //Me
            E: "Mi",
            F: "Fa",
            "F♯": "Fi",
            "G♭": "Se",
            G: "Sol",
            "G♯": "Si",
            "A♭": "Le", //Lo
            A: "La",
            "A♯": "Li",
            "B♭": "Te", //Ta
            B: "Ti"
        }

        return solfege[note];

    }

    static #frequencyFromKey(key) { 
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

        return SwPiano.#chromaticTable[octave][enharmonicNotes[note] ? enharmonicNotes[note] : note];
    }

    //https://en.wikipedia.org/wiki/American_Sign_Language#/media/File:Asl_alphabet_gallaudet.svg
    //https://commons.wikimedia.org/wiki/File:Sign_language_Z.svg
    //https://www.musictheorytutor.org/2013/03/25/solfege-hand-signs/
    static #aslFromKey(key) { 
        const origin = window.location.hostname === '127.0.0.1' ? "http://127.0.0.1:5508" : "https://music.siliconwat.com";

        const accidental = key[2] ? key[2] : "";
        const note = key[0];
        const octave = key[1]; 

        return `${origin}/components/sw-piano/ASL/notes/${note.toLowerCase()}.svg`;
    }

    static get instruments() {
        return {
            piano: {
                treble: SwPiano.#treble,
                bass: SwPiano.#bass
            },
            keyboard: {
                treble: ['z', 's', 'x', 'd', 'c', 'v', 'g', 'b', 'h', 'n', 'j', 'm', 'q<br>,', '2<br>l', '2<br>.', '3<br>;', '3<br>/', 'r', '5', 't', '6', 'y', '7', 'u', 'i'],
                bass: ['z', 's', 'x', 'd', 'c', 'v', 'g', 'b', 'h', 'n', 'j', 'm', 'q<br>,', '2<br>l', 'w<br>.', '3<br>;', 'e<br>/', 'r', '5', 't', '6', 'y', '7', 'u', 'i'],
            },
            midi: {
                treble: ['60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84'],
                bass: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60']
            },
            voice: { 
                treble: SwPiano.#treble.map(key => [SwPiano.#solfegeFromKey(key), Math.round(SwPiano.#frequencyFromKey(key))]),
                bass: SwPiano.#bass.map(key => [SwPiano.#solfegeFromKey(key), Math.round(SwPiano.#frequencyFromKey(key))])
            },
            ASL: {
                treble: SwPiano.#treble.map(key => SwPiano.#aslFromKey(key)),
                bass: SwPiano.#bass.map(key => SwPiano.#aslFromKey(key))
            }
        };
    }

    static get observedAttributes() {
        return ['instrument', 'clef'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        //console.log(SWPiano.chromaticTable)
    }

    connectedCallback() {
        if (!this.hasAttribute('instrument') && !this.hasAttribute('clef')) this.render('piano', 'treble');
    }

    render(instrument, clef) {
        const ul = this.shadowRoot.querySelector('ul');
        ul.replaceChildren();
        SwPiano.instruments[instrument][clef].forEach((key, index) => {
            const li = document.createElement('li');
            li.onclick = () => this.dispatchEvent(new CustomEvent("sw-piano", { bubbles: true, composed: true, detail: { instrument, clef, key, note: SwPiano[clef][index] }}));
            const span = document.createElement('span');

            switch (instrument) {
                case "piano":
                    span.textContent = key; // innerHTML required for html entities
                    break;
                case "keyboard":
                    span.innerHTML = key;
                    break;
                case "midi":
                    span.appendChild(document.createTextNode(key));
                    break;
                case "voice":
                    span.append(key[0], document.createElement('br'), key[1]);
                    break;
                case "ASL":
                    const img = document.createElement('img');
                    img.src = key;
                    span.append(img);
                    break;
            }

            li.append(span);
            ul.append(li);
        });
    }

    get instrument() {
        return this.getAttribute('instrument');
    }

    set instrument(value) {
        this.setAttribute('instrument', value);
    }

    get clef() {
        return this.getAttribute('clef');
    }

    set clef(value) {
        this.setAttribute('clef', value);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue !== oldValue) this.render(this.getAttribute('instrument') || "piano", this.getAttribute('clef') || "treble");
    }
    
}