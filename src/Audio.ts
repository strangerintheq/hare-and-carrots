
let AudioContext = window.AudioContext || window['webkitAudioContext'];
let context = new AudioContext();
context.resume();
let gain = context.createGain();
gain.connect(context.destination);
gain.gain.value = 0.01

function play(freq, delay, duration){
    let oscillator = context.createOscillator();
    oscillator.type = "sine";
    oscillator.connect(gain);
    oscillator.frequency.value = freq;
    oscillator.start(context.currentTime + delay);
    // oscillator.frequency.setTargetAtTime(freq*2,context.currentTime + duration/4, 0.3);

    oscillator.stop(context.currentTime + duration + delay);
}

export function jumpSound(){
    for(let i=0; i<5;i++)
        play(330+i*120, 0+0.02*i, 0.02)
}
