export async function updateFromPlayer(player) {
    switch (player.action) {
        case "play":
            this.play(player.tempo);
            break;
        case "pause":
            this.pause();
            break;
        case "stop":
            this.stop();
            break;
        case "copy":
            await this.copy();
            break;
        case "paste":
            await this.paste();
            break;
        case "delete":
            this.remove();
            break;
        case "new":
            this.clear();
            break;
    }
}

export async function copy() {
    if (this.meta.pointer) await navigator.clipboard.writeText(JSON.stringify(this[this.meta.clef].score[this.meta.pointer[0]][this.meta.pointer[1]]));
}

export async function paste() {
    if (this.meta.pointer) {
        const beat = JSON.parse(await navigator.clipboard.readText());
        const li = this.shadowRoot.getElementById(`sw-${this.meta.pointer[0]}-${this.meta.pointer[1]}`);
        li.replaceChildren();
        this.renderBeat(li, beat);
        this[this.meta.clef].score[this.meta.pointer[0]][this.meta.pointer[1]] = beat;
    }
}

export function remove() {
    if (this.meta.pointer) {
        const li = this.shadowRoot.getElementById(`sw-${this.meta.pointer[0]}-${this.meta.pointer[1]}`);
        li.replaceChildren();
        this[this.meta.clef].score[this.meta.pointer[0]][this.meta.pointer[1]] = {};
    }
}

export function clear() {
    if (window.confirm("Are you sure you want to delete this entire score?")) {
        this[this.meta.clef].score = [];
        this.render();
    }
}