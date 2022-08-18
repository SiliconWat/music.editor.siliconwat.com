export function initSpeech() {
    const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
    const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

    const colors = [ 'red' , 'orange' , 'yellow', 'green', 'blue', 'indigo', 'violet' ];
    const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(' | ')};`

    const recognition = new SpeechRecognition();
    const speechRecognitionList = new SpeechGrammarList();
    
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = event => {
        const color = event.results[0][0].transcript;
        console.log(color, `Confidence: ${event.results[0][0].confidence}`);
    };

    recognition.onspeechend = () => {
        recognition.stop();
    };

    recognition.onnomatch = event => {
        console.log("I didn't recognize that color.");
    };

    recognition.onerror = event => {
        console.log(`Error occurred in recognition: ${event.error}`);
    };

    return recognition;
}

export function speech() {
    this.recognition.start();
    console.log('Ready to receive a color command.');
}