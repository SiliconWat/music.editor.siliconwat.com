import template from './template.mjs';
import { setPointer, updateFromPiano, updateFromNav, updateMeasure } from './note.mjs';
import { updateFromPlayer, play } from "./player.mjs";

export class SwEditor extends HTMLElement {
    static get observedAttributes() {
        return ['clef', 'tempo'];
    }
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.meta = { pointer: null, clef: "treble", keySignature: "CM", timeSignature: [4, 4], tempo: 100 };

        this.treble = {
            notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6'],
            score: [
                [{note: 'C5', duration: 'whole', accidental: null}, 
                    {note: 'C5', duration: 'half', accidental: 'natural'},
                    {note: 'C4', duration: 'quarter', accidental: 'flat'},
                    {note: 'C6', duration: 'half', accidental: 'sharp'}],
                [{note: 'rest', duration: 'whole'},
                    {note: 'rest', duration: 'half'},
                    {note: 'rest', duration: 'quarter'},
                    {}],
                    [{}, {}, {}, {}]
            ]
        }
        
        this.bass = {
            notes: ['C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4'],
            score: []
        }
    }

    connectedCallback() {
        if (!this.hasAttribute('clef') && !this.hasAttribute('tempo')) this.render();

        this.shadowRoot.querySelector('section').onclick = () => {
            this.dispatchEvent(new CustomEvent('sw-editor', { bubbles: true, composed: true, detail: { answer: true } }));
        }
    }

    render() {
        const section = this.shadowRoot.querySelector('section');
        section.replaceChildren();
        
        const ol = document.createElement('ol');
        ol.classList.add(this.meta.clef);
        section.append(ol);

        this[this.meta.clef].score.forEach((measure, m) => {
            const ol = document.createElement('ol');
            measure.forEach((beat, b) => {
                const li = document.createElement('li');
                li.id = `sw-${m}-${b}`;
                li.onclick = () => this.setPointer(m, b);
                ol.append(li);

                if (beat.note) {
                    const div = document.createElement('div');
                    div.classList.add(beat.duration)
                    if (beat.note === 'rest') div.classList.add('rest');
                    else { 
                        div.classList.add('note', beat.note);
                        if (beat.duration !== 'whole') div.classList.add('stem', this[this.meta.clef].notes.indexOf(beat.note) < 6 ? 'up' : 'down');
                    }
                    li.append(div);

                    if (beat.accidental) {
                        const span = document.createElement('span');
                        span.classList.add(beat.accidental);
                        div.append(span);
                    }
                }
            });
            section.append(ol);
        });
    }

    get clef() {
        return this.getAttribute('clef');
    }

    set clef(value) {
        this.setAttribute('clef', value);
    }

    get tempo() {
        return this.getAttribute('tempo');
    }

    set tempo(value) {
        this.setAttribute('tempo', value);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue !== oldValue) {
            this.meta[name] = newValue;
            if (name === 'clef') this.render();
        }
    }
    
}

SwEditor.prototype.updateFromPlayer = updateFromPlayer;
SwEditor.prototype.play = play;

Object.assign(SwEditor.prototype, { setPointer, updateFromPiano, updateFromNav, updateMeasure });
