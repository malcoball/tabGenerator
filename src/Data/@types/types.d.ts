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
        singleNote : {
            change : (tabIndex:number,noteIndex:number,changeValue:note) =>void;
            add : (tabIndex:number,newValue:note)=>void;
            remove : (tabIndex:number)=>void;
        };
        instrument : (tabIndex:number,instrumentName : instrumentName) =>void;
        create : (title:string,scale:scaleName,instrument:instrumentName,length:number,rootNote:number,octave:number,noteLengths:boolean[],deadNoteChance:number)=>void;
        add : (tab:tabType)=>void;
        remove : (tabIndex:number)=>void;
        changeTitle : (tabIndex:number,title:string)=>void;
        changeTempo : (tabIndex:number,tempo:number)=>void;

    }
    effects : effectType[];
    getEffects : {
        // single: (index: number) => effectType;
        single :{
            byIndex : (index:number)=> effectType,
            byTitle : (title:string)=> effectType,
            toTone: (title: string) => (Tone.Tremolo | Tone.Distortion | Tone.BitCrusher | Tone.Reverb)[]
        },
        all :{
            title : ()=>string[];
        }
    };
    changeEffects : {
        add : (input:effectType)=>void
    };
    getPrompts :{
        active : promptTypes
        newNote : ()=>{
            tabIndex: number;
            noteIndex: number;
            noteValue: note;
            instrument:instrumentProperty;
        }
        saveInfo : {
            tabInfo : tabType
        }
    }
    changePrompts : {
        set:{
            newNote :{
                simple : (tabIndex:number,noteIndex:number,instrument:instrumentProperty)=>void,
                fretboard : (tabIndex:number,noteIndex:number,instrument:instrumentProperty)=>void,
            },
            save :(tabIndex:number)=>void,
            load : ()=>void,
            effect : ()=>void,
            tab : ()=>void
        }
        // set : (promptSetting : promptTypes)=>void,
        // newNote:{
        //     simple:(notePromptValues : {noteValue:note,tabIndex:number,noteIndex:number})=>void
        // }
        close :()=>void
    };
}
export type promptTypes =null | 'saveTab' | 'saveEffect' | 'newTab' | 'newEffect' | 'newNoteSimple' | 'newNoteFretboard' | 'load';
