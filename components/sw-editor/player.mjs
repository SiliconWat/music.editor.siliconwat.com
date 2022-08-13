export function updateFromPlayer(player) {
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
            this.copy();
            break;
        case "paste":
            this.paste();
            break;
        case "delete":
            this.remove();
            break;
        case "new":
            this.clear();
            break;
    }
}

export function play() {
    console.log('hi')
}