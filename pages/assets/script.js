const textBox = document.getElementById('textBox');
const speakBtn = document.getElementById('speak');
let myFile = document.getElementById('myFile');
const speak = (text)=> {
    utterance = new SpeechSynthesisUtterance() 
    utterance.lang = "en-US";
    try{
        speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    }except Exception as e{
        textBox.innerText = e
    }
    speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}
speak(' ');
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
    speakBtn.innerHTML = 'Listen';
    myFile.value= '';
}
setInterval(()=> {
    if (speechSynthesis.speaking) {
        textBox.style = "background-color:#EBEBEB;"
    } else {
        textBox.style = "background-color:#fff;"
    }
}, 100);

const readFile =(fileSelector)=>{
    const file = fileSelector.files[0];
    if (file){
    let myText="";
        const reader = new FileReader();
        reader.addEventListener('load',()=>{
            const fileTxt = reader.result
            textBox.value=fileTxt;
        });
        reader.readAsText(file);
    }
}

myFile.addEventListener('input',()=>{
    readFile(myFile);
    myFile.value='';
})
const filePlayBtn = document.getElementById('playFile');




// Hamburger JS
const burger = document.querySelectorAll('.hamburger')[0];
burger.addEventListener('click',()=>{
    burger.classList.toggle('active');
})
