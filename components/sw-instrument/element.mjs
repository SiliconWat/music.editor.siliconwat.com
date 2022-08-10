import template from './template.mjs';

export class SwInstrument extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        ['piano', 'keyboard', 'midi', 'voice', 'ASL'].forEach(instrument => this.shadowRoot.getElementById(instrument).onclick = () => this.dispatchEvent(new CustomEvent("sw-instrument", { bubbles: true, composed: true, detail: { instrument }})));
    }
}