import template from './template.mjs';
import { MusicLibrary } from '/library/music.mjs';

export class SwPiano extends HTMLElement {
    static #musicLibrary = new MusicLibrary(440);
    static #treble = ['C4', 'C4♯', 'D4', 'D4♯', 'E4', 'F4', 'F4♯', 'G4', 'G4♯', 'A4', 'A4♯', 'B4', 'C5', 'C5♯', 'D5', 'D5♯', 'E5', 'F5', 'F5♯', 'G5', 'G5♯', 'A5', 'A5♯', 'B5', 'C6'];
    static #bass = ['C2', 'D2♭', 'D2', 'E2♭', 'E2', 'F2', 'G2♭', 'G2', 'A2♭', 'A2', 'B2♭', 'B2', 'C3', 'D3♭', 'D3', 'E3♭', 'E3', 'F3', 'G3♭', 'G3', 'A3♭', 'A3', 'B3♭', 'B3', 'C4'];

    static #frequencyFromKey(key) {
        const accidental = key[2] || "";
        const note = key[0] + accidental;
        const octave = key[1];
        return SwPiano.#musicLibrary.frequency(octave, note);
    }

    static #audioFromKey(key) { 
        const accidental = key[2] || "";
        const note = key[0] + accidental;
        const octave = key[1]; 
        return SwPiano.#musicLibrary.audio(octave, note);
    }

     static #solfegeFromKey(key) { 
        const accidental = key[2] || "";
        const note = key[0] + accidental;
        const octave = key[1];
        return SwPiano.#musicLibrary.solfege(octave, note);
    }

    static #aslFromKey(key) { 
        const accidental = key[2] || "";
        const note = key[0];
        const octave = key[1]; 
        return SwPiano.#musicLibrary.asl(octave, note);
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
    }

    connectedCallback() {
        window.onkeyup = () => {}; // detect keyboard
        //todo: detect midi, mic, cam
        if (!this.instrument && !this.clef) this.render('piano', 'treble');
    }

    render(instrument, clef) {
        const ul = this.shadowRoot.querySelector('ul');
        ul.replaceChildren();
        SwPiano.instruments[instrument][clef].forEach((key, index) => {
            const li = document.createElement('li');
            li.onclick = () => {
                const pitch = eval(`SwPiano.#${clef}`)[index];
                const audio = SwPiano.#audioFromKey(pitch);
                if (this.audible) audio.play();
                this.dispatchEvent(new CustomEvent("sw-piano", { bubbles: true, composed: true, detail: { instrument, clef, key, pitch, audio }}));
            }
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

    get audible() {
        return this.hasAttribute('audible');
    }

    set audible(value) {
        if (Boolean(value))
          this.setAttribute('audible', '');
        else
          this.removeAttribute('audible');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue !== oldValue) this.render(this.instrument || "piano", this.clef || "treble");
    }
    
}