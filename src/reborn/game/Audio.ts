import {Cell} from "../data/Cell";
import {CellType} from "../data/CellType";

let AudioContext = window.AudioContext || window['webkitAudioContext'];
let context, gain;

function play(freq, delay, duration){

    if (!context) {
        context = new AudioContext();
        context.resume();
        gain = context.createGain();
        gain.connect(context.destination);
        gain.gain.value = 0.4
    }

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

export function jumpWaterSound(){
    for(let i=0; i<7;i++)
        play(330+i*120+Math.sin(i)*100, 0+0.005*i+Math.sin(i)*0.1, 0.01)
}


export function playCellAudio(cell: Cell){
    try {
        if (cell.type === CellType.GRASS)
            jumpSound()
        else
            jumpWaterSound();
    } catch (e) {
    }

}