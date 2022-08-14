export async function updateFromPlayer(player) {
    if (player.tempo) this.updateTempo(player.tempo)
    else switch (player.action) {
        case "play":
            this.play();
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
    };
}

export function updateTempo(tempo) {
    this.setAttribute('tempo', tempo);
}

export async function copy() {
    if (this.staff.pointer) await navigator.clipboard.writeText(JSON.stringify(this.score[this.staff.clef].notes[this.staff.pointer[0]][this.staff.pointer[1]]));
}

export async function paste() {
    if (this.staff.pointer) {
        const note = JSON.parse(await navigator.clipboard.readText());
        const li = this.shadowRoot.getElementById(`sw-${this.staff.pointer[0]}-${this.staff.pointer[1]}`);
        li.replaceChildren();
        this.renderNote(li, note);
        this.score[this.staff.clef].notes[this.staff.pointer[0]][this.staff.pointer[1]] = note;
    }
}

export function remove() {
    if (this.staff.pointer) {
        const li = this.shadowRoot.getElementById(`sw-${this.staff.pointer[0]}-${this.staff.pointer[1]}`);
        li.replaceChildren();
        this.score[this.staff.clef].notes[this.staff.pointer[0]][this.staff.pointer[1]] = {};
    }
}

export function clear() {
    if (window.confirm("Are you sure you want to delete this entire score?")) {
        this.score[this.staff.clef].notes = [];
        this.render();
    }
}