import template from './template.mjs';

export class SwPlayer extends HTMLElement {
    #min = 10;
    #max = 300;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        ['play', 'pause', 'stop', 'copy', 'paste', 'delete', 'new'].forEach(action => this.shadowRoot.getElementById(action).onclick = () => this.dispatchEvent(new CustomEvent("sw-player", { bubbles: true, composed: true, detail: { action }})));
        
        const input = this.shadowRoot.querySelector('input');
        input.min = this.#min;
        input.max = this.#max;
        input.value = 120 ; //todo: set to localStorage

        input.onkeyup = () => this.dispatchEvent(new CustomEvent("sw-player", { bubbles: true, composed: true, detail: { tempo: parseInt(input.value) }}));
        input.onchange = () => { 
            const tempo = parseInt(input.value);
            if (tempo < this.#min) {
                input.value = this.#min;
                this.dispatchEvent(new CustomEvent("sw-player", { bubbles: true, composed: true, detail: { tempo: this.#min }}));
            } else if (tempo > this.#max) {
                input.value = this.#max;
                this.dispatchEvent(new CustomEvent("sw-player", { bubbles: true, composed: true, detail: { tempo: this.#max }}));
            } else input.value = tempo;
        };
    }
}