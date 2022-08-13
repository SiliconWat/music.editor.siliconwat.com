export function setPointer(measure, beat) {
    if (this.meta.pointer) this.shadowRoot.getElementById(`sw-${this.meta.pointer[0]}-${this.meta.pointer[1]}`).classList.remove('pointer');
    this.shadowRoot.getElementById(`sw-${measure}-${beat}`).classList.add('pointer');
    this.meta.pointer = [measure, beat];
}

export function updateFromPiano(key) {
    if (this.meta.pointer) {
        const li = this.shadowRoot.getElementById(`sw-${this.meta.pointer[0]}-${this.meta.pointer[1]}`);
        const accidentals = {"♯": "sharp", "♭": "flat", "♮": "natural"}

        const note = key.substring(0, 2);
        const accidental = accidentals[key[2]];
        const beat = this[this.meta.clef].score[this.meta.pointer[0]][this.meta.pointer[1]];
        
        if (li.firstElementChild) {
            li.firstElementChild.classList.replace(beat.note, note);
        } else  {
            const div = document.createElement('div');
            div.classList.add('note', 'whole', note);
            li.append(div);
            
        }
        beat.note = note;

        if (accidental) {
            if (li.firstElementChild.firstElementChild) {
                li.firstElementChild.firstElementChild.classList.replace(beat.accidental, accidental);
            } else {
                const span = document.createElement('span');
                span.classList.add(accidental);
                li.firstElementChild.append(span);
            }  
        } else {
            if (li.firstElementChild.firstElementChild) {
                li.firstElementChild.replaceChildren();
            }   
        }             
        beat.accidental = accidental;
    }
}

export function updateFromNav(nav) {
    switch (nav.menu) {
        case "Measure":
            this.updateMeasure(nav.submenu);
            break;
        case "Note":
            this.updateNote(nav.submenu);
            break;
        case "Accidental":
            this.updateAccidental(nav.submenu);
            break;
        case "Rest":
            this.updateRest(nav.submenu);
            break;
    }
}

export function updateMeasure(submenu) {
    const measure = this.meta.pointer ? this.meta.pointer[0] : this[this.meta.clef].score.length - 1;

    switch (submenu) {
        case "Add":
            this[this.meta.clef].score.splice(measure + 1, 0, [{}, {}, {}, {}]);
            break;
        case "Remove":
            this[this.meta.clef].score.splice(measure, 1);
            break;
    }

    this.meta.pointer = null; //todo later: reset pointer to new position?
    this.render(); //todo later: render only the measure? prob not bc li#id
}