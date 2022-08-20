const STATE = {
    tempo: 120
};

export const onStateChange = {
    set(state, property, value) {
        state[property] = value;
        return true;
    }
};

export const state = new Proxy(STATE, onStateChange);