export function updateFromNav(nav) {
    switch (nav.menu) {
        case "Measure":
            this.updateMeasure(nav.submenu);
            break;
        case "Note":
            this.updateNote(nav.submenu.toLowerCase());
            break;
        case "Accidental":
            this.updateAccidental(nav.submenu.toLowerCase());
            break;
        case "Rest":
            this.updateRest(nav.submenu.toLowerCase());
            break;
    }
}

export function updateMeasure(action) {
    const measure = this.meta.pointer ? this.meta.pointer[0] : this[this.meta.clef].score.length - 1;

    switch (action) {
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

export function updateNote(duration) {
    if (this.meta.pointer) {
        const beat = this[this.meta.clef].score[this.meta.pointer[0]][this.meta.pointer[1]];
        const li = this.shadowRoot.getElementById(`sw-${this.meta.pointer[0]}-${this.meta.pointer[1]}`);
        
        beat.note = beat.note || "C4";
        beat.duration = duration;

        li.replaceChildren();
        this.renderBeat(li, beat);
    }
}

export function updateAccidental(accidental) {
    if (this.meta.pointer) {
        const beat = this[this.meta.clef].score[this.meta.pointer[0]][this.meta.pointer[1]];
        const li = this.shadowRoot.getElementById(`sw-${this.meta.pointer[0]}-${this.meta.pointer[1]}`);
        
        beat.note = beat.note || "C4";
        beat.duration = beat.duration || 'whole';
        beat.accidental = accidental === beat.accidental ? null : accidental;

        li.replaceChildren();
        this.renderBeat(li, beat);
    }
}

export function updateRest(duration) {
    if (this.meta.pointer) {
        const beat = this[this.meta.clef].score[this.meta.pointer[0]][this.meta.pointer[1]];
        const li = this.shadowRoot.getElementById(`sw-${this.meta.pointer[0]}-${this.meta.pointer[1]}`);
        
        beat.note = "rest";
        beat.duration = duration;
        beat.accidental = null;

        li.replaceChildren();
        this.renderBeat(li, beat);
    }
}

export function updateFromPiano(key) {
    if (this.meta.pointer) {
        const note = key.substring(0, 2);
        const accidentals = {"♯": "sharp", "♭": "flat", "♮": "natural"};
        const accidental = accidentals[key[2]] || null;
        
        const beat = this[this.meta.clef].score[this.meta.pointer[0]][this.meta.pointer[1]];
        const li = this.shadowRoot.getElementById(`sw-${this.meta.pointer[0]}-${this.meta.pointer[1]}`);
        
        beat.note = note;
        beat.accidental = accidental;
        beat.duration = beat.duration || 'whole';

        li.replaceChildren();
        this.renderBeat(li, beat);

        //this.setNote(note);
        //this.setAccidental(accidental);
    }
}

//deprecated
export function setNote(note) {
    const beat = this[this.meta.clef].score[this.meta.pointer[0]][this.meta.pointer[1]];
    const li = this.shadowRoot.getElementById(`sw-${this.meta.pointer[0]}-${this.meta.pointer[1]}`);
    
    if (li.firstElementChild) {
        li.firstElementChild.classList.replace(beat.note, note);
        beat.note = note;
    } else  {
        beat.note = note;
        beat.duration = 'whote';
        const div = document.createElement('div');
        div.classList.add('note', 'whole', note);
        li.append(div);
    }
}

//deprecated
export function setAccidental(accidental) {
    const beat = this[this.meta.clef].score[this.meta.pointer[0]][this.meta.pointer[1]];
    beat.accidental = accidental;
    const li = this.shadowRoot.getElementById(`sw-${this.meta.pointer[0]}-${this.meta.pointer[1]}`);

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
}