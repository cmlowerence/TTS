let speech = document.getElementById("inputText"),
	convert = document.getElementById("speak"),
	voiceIco = document.getElementById("speakerIcon"),
	count = 1;
speech.addEventListener('change',()=>{
	convert.innerHTML = 'Listen';
	voiceIco.innerHTML = '&#128264';
        
	speechText = this.value.split(/\r\n|\r|\n/g).join(" ");
	speechSynthesis.cancel();
	count = 1;
})
convert.addEventListener('click',function(){
	if(!speechSynthesis.speaking || speechSynthesis.pause()){
		speechText = speech.value;
		let speechVoice = new SpeechSynthesisUtterance();
		let voices = speechSynthesis.getVoices();
		speechVoice.voice = voices[2];
		console.log(voices[2]);
		speechVoice.text = speechText;
		speechVoice.lang = 'en-US';
		speechSynthesis.speak(speechVoice);
		// alert("hey there");
	}
	if (count == 1){
		convert.innerHTML = 'Playing...';
		voiceIco.innerHTML ='&#128266';
		speechSynthesis.resume();
		setTimeout(()=>{
			count = 2;
		},300)
	}else{
		convert.innerHTML = 'Paused';
		voiceIco.innerHTML = '&#128264';
		speechSynthesis.paused;
		setTimeout(()=>{
		    count = 1;
		},300)
	}
	setInterval(()=>{
		if (!speechSynthesis.speaking && count==2){
			convert.innerHTML = 'Listen';
			voiceIco.innerHTML = '&#128264';
			count = 1;
		}
	},100);
})
setInterval(()=>{
    console.log(count);
},1000);
