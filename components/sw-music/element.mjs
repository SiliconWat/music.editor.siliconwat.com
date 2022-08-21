import { onStateChange } from '/components/sw-music/state.mjs';

class SwMusic extends HTMLBodyElement {
    #body;

    constructor() {
        const body = super();
        this.#body = body;

        this.SwPlayer = this.#body.querySelector('sw-player');
        this.SwEditor = this.#body.querySelector('sw-editor');
        this.SwPiano = this.#body.querySelector('sw-piano');

        onStateChange.set = this.onStateChange.bind(this);
    }

    connectedCallback() {
        this.#body.addEventListener('sw-nav', event => this.SwEditor.updateFromNav(event.detail));
        this.#body.addEventListener('sw-player', event => this.SwEditor.updateFromPlayer(event.detail.action));
        this.#body.addEventListener('sw-instrument', event => {
            this.SwPiano.instrument = event.detail.instrument;
            this.SwPiano.audible = ['piano', 'keyboard', 'ASL'].includes(event.detail.instrument);
        });
        this.#body.addEventListener('sw-piano', event => this.SwEditor.updateFromPiano(event.detail));
    }

    onStateChange(state, property, value) {
        if (state[property] !== value) {
            state[property] = value;
            this.SwPlayer.tempo = value;
            this.SwEditor.tempo = value;
            localStorage.setItem('state', JSON.stringify(state));
        }
        return true;
    }
}

customElements.define('sw-music', SwMusic, { extends: 'body' });