const textBox = document.getElementById('textBox');
const speakBtn = document.getElementById('speak');
const speak = (text)=> {
    speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}
const advSpeak = (grandText, btn = speakBtn)=> {
    let textLines = grandText.split(/\r\n|\r|\n/g).join(' ').split('. ');
    for (let i = 0; i < textLines.length; i++) {
        textLines[i] += '.';
    }
    for (let i = 0; i < textLines.length; i += 30) {
        let chunk = textLines.slice(i, i+30);
        chunk = chunk.toString().split('.,').join('. ').replace(',', ', ');
        btn.innerHTML = 'Playing...'
        setInterval(()=> {
            if (!speechSynthesis.speaking) {
                btn.innerHTML = 'Listen'
            }
        },
            1000)
        if (chunk === '.' || chunk === '. ' || chunk === ' .') {
            chunk = ''
        }
        speak(chunk);
    }
}
const restart = ()=> {
    speechSynthesis.cancel();
    advSpeak(textBox.value)
}
const stop = ()=> {
    speechSynthesis.cancel();
    textBox.value = '';
    speakBtn.innerHTML = 'Listen'
}
setInterval(()=> {
    if (speechSynthesis.speaking) {
        textBox.style = "background-color:#EBEBEB;"
    } else {
        textBox.style = "background-color:#fff;"
    }
}, 100);