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

export async function copy() {
    if (this.staff.pointer) await navigator.clipboard.writeText(JSON.stringify(this.score[this.clef].notes[this.staff.pointer[0]][this.staff.pointer[1]]));
}

export async function paste() {
    if (this.staff.pointer) {
        const note = JSON.parse(await navigator.clipboard.readText());
        const li = this.shadowRoot.getElementById(`sw-${this.staff.pointer[0]}-${this.staff.pointer[1]}`);
        li.replaceChildren();
        this.renderNote(li, note);
        this.score[this.clef].notes[this.staff.pointer[0]][this.staff.pointer[1]] = note;
    }
}

export function remove() {
    if (this.staff.pointer) {
        const li = this.shadowRoot.getElementById(`sw-${this.staff.pointer[0]}-${this.staff.pointer[1]}`);
        li.replaceChildren();
        this.score[this.clef].notes[this.staff.pointer[0]][this.staff.pointer[1]] = {};
    }
}

export function clear() {
    if (window.confirm("Are you sure you want to delete this entire score?")) {
        this.score[this.clef].notes = [];
        this.render();
    }
}

export function play() {
    let counter = 0;
    this.score[this.clef].notes.forEach((measure, m) => {
        measure.forEach((note, n) => {
            if (note.pitch) {
                const beat = this.tempo/60;
                const player = this.musicLibrary.player(this.volume);
                player.play(this.getPitch(note), this.getDuration(note), beat*counter++);
            }
        });
    });    
}

export function getPitch(note) {
    if (note.pitch === 'rest') {
        return 0;
    } else {
        const accidentals = { sharp: "♯", flat: "♭" };
        const octave = note.pitch[1];
        const accidental = accidentals[note.accidental] || "";
        return this.musicLibrary.frequency(octave, note.pitch[0] + accidental);
    }
}

export function getDuration(note) {
    const beat = this.tempo/60;
    const durations = { whole: beat*4, half: beat*2, quarter: beat };
    return durations[note.duration];
    
}  

// function playNote(note, length) {
//     const AudioContext = window.AudioContext || window.webkitAudioContext,
//     ctx = new AudioContext(),
//     oscillator = ctx.createOscillator(),
//     gainNode = ctx.createGain();
//     oscillator.type = 'triangle';
//     oscillator.frequency.value = note;
//     gainNode.gain.value = volume;
//     oscillator.connect(gainNode);   
//     gainNode.connect(ctx.destination);
//     oscillator.start(0);
//     //Trying to prevent popping sound on note end. Probably can be improved
//     gainNode.gain.setTargetAtTime(0, length/1000-0.05, 0.08);
//     oscillator.stop(ctx.currentTime + (length/1000+0.2));
//     oscillator.onended = () => ctx.close();


//     ///
//     var context = new AudioContext();

//     var notes = [1175, 2794];
//     var duration = 1;
//     var interval = 2;
  
//     function play(frequency, time) {
//       var o = context.createOscillator();
//       var g = context.createGain();
//       o.connect(g);
//       g.connect(context.destination);
//       g.gain.exponentialRampToValueAtTime(
//         0.00001, context.currentTime + duration + time
//       );
//       o.frequency.value = frequency;
//       o.start(time);
//     }
  
//     for (var i = 0; i < notes.length; i++) {
//       play(notes[i], i * interval);
//     }

//     ///
//   }

export function speak(text, rate=1, pitch=1, voice=11) {
    const synth = window.speechSynthesis;
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = rate;
    speech.pitch = pitch;
    speech.voice = synth.getVoices()[voice];
    console.log(speech.voice)
    synth.speak(speech);
}