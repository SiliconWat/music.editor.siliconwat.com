import template from './template.mjs';

export class SwEditor extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelector('section').onclick = () => {
            this.dispatchEvent(new Event('correct', { bubbles: true, composed: true }));
        }
    }
}