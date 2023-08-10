import { note, scaleName } from "../@types/types"
import scales from "../Music/Scales";
import { breakPoints, conversions } from "../StaticFunctions";

const randomNote = (scale:number[],rootNote:number) : string=>{
    let number = Math.floor(Math.random()*scale.length) ;
    return (scale[number]+rootNote).toString();
}
const isDeadnote = (chance:number):boolean=>{
    const randomNumber = Math.round(Math.random()*100);
    if (randomNumber < chance) return true;
    else return false;
}


export const newTab =  (scaleName:scaleName,length:number,rootNoteIn:number,octave:number,noteLengths:boolean[],deadNoteChance:number) : note[]=>{
    const scale = scales[scaleName].scale;
    const out = [];
    const parseNoteLength = conversions.lengths.booleansToLengths(noteLengths);
    
    for (let i =0; i < length; i++){
        let note:note = {note:"0",length:'16n'};
        let rootNote = rootNoteIn + (octave * 12);
        const lengthChose = Math.floor(Math.random()*parseNoteLength.length);
        note.length = parseNoteLength[lengthChose];
        if (i === 0){
            note.note = rootNote.toString();
        } else {
            note.note = isDeadnote(deadNoteChance) ? "-1" : randomNote(scale,rootNote);
        }
        // Affect the length based on what note length has been chosen
        const tabShorted = conversions.length.toTabShorten(note.length,'16n');
        i += tabShorted;
        out.push(note);
    }
    return out;
}

export const singleLineToMulti = (singleLine:string[],breakPointsInput:number[])=>{
    let out = [];
    const {breakPoint,note} = breakPoints.parseFull(singleLine[0],[0,5,10,15]);
        
}