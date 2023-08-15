import * as Tone from 'tone';
import { note, synthName } from '../@types/types';
import { conversions } from '../StaticFunctions';
import Synths from './Instruments/Synths/Synths';

//create a synth and connect it to the main output (your speakers)
export const playNote = (note:note,octave:number,bpm:number,synthIn:synthName)=>{
    // const synth = new Tone.Synth().toDestination();
    // const synth = Synths.synths[1].synth;
    const synth = Synths.getSynth(synthIn).synth;
    const now = Tone.now()

    const timing = conversions.length.note.noteToMilisecond(note.length,bpm);
    if (parseInt(note.note) > -1){ // Dead notes are -1s
        // Note conversion
        let noteIn = (parseInt(note.note)+(octave*12)).toString();
        const noteOut = conversions.noteTo.tone({note : noteIn,length:note.length});
        // Play the converted note
        
        synth.triggerAttackRelease(noteOut.note, timing);
        // synth.triggerAttack(noteOut.note,now);
        // synth.triggerAttack(noteOut.note,now);
    }
    // Return true when finished
    return new Promise((res)=>{
        setTimeout(()=>{
            synth.triggerRelease(now);
            res(true);
        },timing);
    });
}