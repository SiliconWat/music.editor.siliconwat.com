class SwMusic extends HTMLBodyElement {
    #body;

    constructor() {
        const body = super();
        this.#body = body;

        this.SwScoreboard = this.#body.querySelector('sw-scoreboard');
        this.SwPiano = this.#body.querySelector('sw-piano');        
    }

    connectedCallback() {  
        this.#body.addEventListener('sw-timer', event => {
            this.SwPiano.clef = event.detail.clef;
        });

        this.#body.addEventListener('sw-instrument', event => {
            this.SwPiano.instrument = event.detail.instrument;
        });

        this.#body.addEventListener('sw-editor', event => this.SwScoreboard[event.detail.answer ? 'incrementCorrect' : 'incrementWrong']());
    }
}

customElements.define('sw-music', SwMusic, { extends: 'body' });