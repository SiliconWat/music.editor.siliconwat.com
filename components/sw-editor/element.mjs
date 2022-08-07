import template from './template.mjs';

export class SwEditor extends HTMLElement {
    static get observedAttributes() {
        return ['clef', 'tempo'];
    }
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.meta = { clef: "treble", keySignature: "CM", timeSignature: [4, 4], tempo: 100 };
        this.score = [[{note: 'c5', duration: 'whole', accidental: null}, 
                    {note: 'c5', duration: 'half', accidental: 'natural'},
                    {note: 'c4', duration: 'quarter', accidental: 'flat'},
                    {note: 'c6', duration: 'half', accidental: 'sharp'}],
                    [{note: 'rest', duration: 'whole'},
                    {note: 'rest', duration: 'half'},
                    {note: 'rest', duration: 'quarter'},
                    {note: null}]];
        this.treble = ['c4', 'd4', 'e4', 'f4', 'g4', 'a4', 'b4', 'c5', 'd5', 'e5', 'f5', 'g5', 'a5', 'b5', 'c6'];
        this.bass = ['c2', 'd2', 'e2', 'f2', 'g2', 'a2', 'b2', 'c3', 'd3', 'e3', 'f3', 'g3', 'a3', 'b3', 'c4'];
    }

    connectedCallback() {
        this.render();

        this.shadowRoot.querySelector('section').onclick = () => {
            this.dispatchEvent(new Event('correct', { bubbles: true, composed: true }));
        }
    }

    render() {
        const section = this.shadowRoot.querySelector('section');
        section.replaceChildren();
        
        const ol = document.createElement('ol');
        ol.classList.add(this.meta.clef);
        section.append(ol);

        this.score.forEach(measure => {
            const ol = document.createElement('ol');
            measure.forEach(beat => {
                const li = document.createElement('li');
                const div = document.createElement('div');
                ol.append(li);
                li.append(div);

                if (beat.note) {
                    div.classList.add(beat.duration)
                    if (beat.note === 'rest') div.classList.add('rest');
                    else { 
                        div.classList.add('note', beat.note, beat.duration);
                        if (beat.duration !== 'whole') div.classList.add('stem', this.treble.indexOf(beat.note) < 6 ? 'up' : 'down');
                    }
                } 

                if (beat.accidental) {
                    const span = document.createElement('span');
                    span.classList.add(beat.accidental);
                    div.append(span);
                }
            });
            section.append(ol);
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue !== oldValue) {
            if (name === 'clef') this.clefHasChanged();
            if (name === 'tempo') this.tempoHasChanged();
            this.render();
        }
    }

    set clef(value) {
        this.setAttribute('clef', value);
    }

    get clef() {
        return this.getAttribute('clef');
    }

    clefHasChanged() {
        this.meta.clef = this.getAttribute('clef');
    }

    set tempo(value) {
        this.setAttribute('tempo', value);
    }

    get tempo() {
        return this.getAttribute('tempo');
    }

    tempoHasChanged() {
        this.meta.tempo = this.getAttribute('tempo');
    }
}