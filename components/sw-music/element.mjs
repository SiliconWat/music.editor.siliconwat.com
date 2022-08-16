export class SwMusic extends HTMLBodyElement {
    #body;

    constructor() {
        const body = super();
        this.#body = body;

        this.SwEditor = this.#body.querySelector('sw-editor');
        this.SwPiano = this.#body.querySelector('sw-piano');
    }

    connectedCallback() {
        this.#body.addEventListener('sw-nav', event => this.SwEditor.updateFromNav(event.detail));
        this.#body.addEventListener('sw-player', event => this.SwEditor.updateFromPlayer(event.detail));
        this.#body.addEventListener('sw-instrument', event => {
            this.SwPiano.instrument = event.detail.instrument;
            this.SwPiano.audible = ['piano', 'keyboard', 'ASL'].includes(event.detail.instrument);
        });
        this.#body.addEventListener('sw-piano', event => this.SwEditor.updateFromPiano(event.detail));
    }
}