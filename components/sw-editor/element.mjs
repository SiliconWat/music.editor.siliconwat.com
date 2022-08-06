import template from './template.mjs';

export class SwEditor extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.meta = { clef: "treble", keySignature: "CM", timeSignature: [4, 4], tempo: 100 };
        this.notes = [];
    }

    connectedCallback() {
        this.attributeChangedCallback();
        this.shadowRoot.querySelector('section').onclick = () => {
            this.dispatchEvent(new Event('correct', { bubbles: true, composed: true }));
        }
    }

    attributeChangedCallback() {
        this.hasClefAttribute();
        this.hasTempoAttribute();
        console.log(this.meta)
    }

    set clef(value) {
        this.setAttribute('clef', value);
    }

    get clef() {
        return this.getAttribute('clef');
    }

    hasClefAttribute() {
        if (this.hasAttribute('clef')) this.meta.clef = this.getAttribute('clef');
    }

    set tempo(value) {
        this.setAttribute('tempo', value);
    }

    get tempo() {
        return this.getAttribute('tempo');
    }

    hasTempoAttribute() {
        if (this.hasAttribute('tempo')) this.meta.tempo = this.getAttribute('tempo');
    }
}