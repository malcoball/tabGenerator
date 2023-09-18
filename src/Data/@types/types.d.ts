import { instrumentProperty } from "../Music/Instruments";

type noteLengths = "32n" | "16n" | "8n" | "4n" | "2n" | "1n";

export type note = {
    note : string,
    length : noteLengths
}
export type scaleName = 'ionian' | 'dorian' | 'phrygian' | 'lydian' | 'mixolydian' | 'aeolian' | 'locrian';
export type scale = {
    name : scaleName,
    scale : number[]
}
export type tab = note[];
export type instrumentName = 'bass' | 'guitar';
export interface tabType {
    index : number;
    title : string;
    tab : tab;
    scale : scaleName;
    change : boolean;
    instrumentName : instrumentName;
    tempo : number;
}

export type effectName = 'distortion' | 'reverb' | 'tremolo' | 'eq';
export type singleEffect = {
    type : effectName,
    active : boolean,
    value : number[]
}
export interface effectType {
    index : number;
    title : string;
    distortion  : singleEffect;
    reverb      : singleEffect;
    tremolo     : singleEffect;
    eq    : singleEffect;
}
export interface instrument{
    name :string,
    breakPoints : number[],
    stringNames : string[],
    stringAmount : number,
    rootNote : string,
    fretAmount : number,
    fretBoard : {
        widths : {
            start : number, change : number
        },
        stringIds : string[]
    }
}
export type synthName ="Bass1" | "Bass2" | "Guitar1" | "AcousticGuitar1" | "Piano1" | "Banjo1" |"Duo" 
| "Synth" | "FMSynth" | "AMSynth" | "MembraneSynth" |"MetalSynth"| "MonoSynth"|"PluckSynth" | "Woah" |'Flute1';
export type synthType = {
    title:synthName,
    synth:any
}
export type noteLengthDisplays = "compressed" | "simplified raw" | "simplified"; 


export type promptTypes =null | 'saveTab' | 'saveEffect' | 'newTab' | 'newEffect' | 'newNoteSimple' | 'newNoteFretboard' | 'loadEffect' | 'loadTab';
