export async function updateFromPlayer(player) {
    if (player.tempo) this.updateTempo(player.tempo)
    else switch (player.action) {
        case "play":
            this.speak("i'm tawn");
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

function sound(note) {
    const frequency = this.musicLibrary.frequency(octave, note);
}

// function playFrequency(frequency) {
//     var context = new AudioContext();
//     var o = context.createOscillator();
//     o.frequency.setTargetAtTime(440, context.currentTime, 0);
//     o.connect(context.destination);
//     o.start(0);
//     ////
//     const context = new AudioContext()
//     const envelope = context.createGain()
//     envelope.gain.value = 5
    
//     const oscillator = context.createOscillator()
//     oscillator.frequency.value = frequency
//     oscillator.type = 'sine'
    
//     oscillator.connect(envelope)
//     envelope.connect(context.destination)
    
//     oscillator.start()
//     envelope.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.5)
//     oscillator.stop(context.currentTime + 1)
// }

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