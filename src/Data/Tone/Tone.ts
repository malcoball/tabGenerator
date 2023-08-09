import * as Tone from 'tone';
import { note } from '../@types/types';
import { conversions } from '../StaticFunctions';

//create a synth and connect it to the main output (your speakers)
export const playNote = (note:note,octave:number,bpm:number)=>{
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now()

    const timing = conversions.length.note.noteToMilisecond(note.length,bpm);
    // Note conversion
    let noteIn = (parseInt(note.note)+(octave*12)).toString();
    const noteOut = conversions.noteTo.tone({note : noteIn,length:note.length});
    // Play the converted note

    // synth.triggerAttackRelease(noteOut.note, 1000);
    synth.triggerAttack(noteOut.note,now);
    // Return true when finished
    return new Promise((res)=>{
        setTimeout(()=>{
            synth.triggerRelease(now);
            res(true);
        },timing);
    });
}