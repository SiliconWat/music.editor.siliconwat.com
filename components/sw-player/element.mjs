import template from './template.mjs';

export class SwPlayer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        ['play', 'pause', 'stop', 'copy', 'paste', 'delete', 'new'].forEach(action => this.shadowRoot.getElementById(action).onclick = () => this.dispatchEvent(new CustomEvent("sw-player", { bubbles: true, composed: true, detail: { action, tempo: this.shadowRoot.querySelector('input').value }})));
    }
}