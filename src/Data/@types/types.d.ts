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
export type instrumentName = 'bass' | 'guitar'
export interface tabType {
    index : number;
    title : string;
    tab : tab;
    scale : scaleName;
    change : boolean;
    instrumentName : instrumentName;
    tempo : number;
}
export interface instrument{
    name :string,
    breakPoints : number[],
    stringNames : string[],
    rootNote : string
}
export type synthName = "Duo" | "Synth" | "FMSynth" | "AMSynth" | "MembraneSynth" |"MetalSynth"|
"MonoSynth"|"NoiseSynth"|"PluckSynth"|"PolySynth";
export type noteLengthDisplays = "compressed" | "simplified raw" | "simplified"; 

export type AppContextType = {
    tabs : tabType[];
    getTabs : {
        single : {
            full : (tabIndex:number)=>tabType;
            arrIndex : (tabIndex:number)=>number;
            note : (tabIndex:number,noteIndex:number)=>note;
        }
    }
    
    changeTabs : {
        // singleNote : (tabIndex:number,noteIndex:number,changeValue:note)=> void;
        singleNote : {
            change : (tabIndex:number,noteIndex:number,changeValue:note) =>void;
            add : (tabIndex:number,newValue:note)=>void;
            remove : (tabIndex:number)=>void;
        };
        instrument : (tabIndex:number,instrumentName : instrumentName) =>void;
        add : (title:string,scale:scaleName,instrument:instrumentName,length:number,rootNote:number,octave:number,noteLengths:boolean[],deadNoteChance:number)=>void;
        remove : (tabIndex:number)=>void;
        changeTitle : (tabIndex:number,title:string)=>void;
        changeTempo : (tabIndex:number,tempo:number)=>void;
    }
}
