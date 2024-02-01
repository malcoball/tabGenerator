import { effectType, synthName } from "./types";

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
        add : (input:effectType)=>void,
        remove: (effectIndex:number)=>void,
        replace:(newEffect:effectType)=>void
    };
    parseEffects : {
        toTone : (value:{distortion:number[]|null,reverb:number[]|null,eq:number[]|null,tremolo:number[]|null})=>any[]
    }
    getPrompts :{
        active : promptTypes
        newNote : ()=>{
            tabIndex: number;
            noteIndex: number;
            noteValue: note;
            instrument:instrumentProperty;
            synth:synthName;
            octave : number
        }
        saveInfo : {
            tabInfo : tabType,
            // effectInfo : effectType
            effectInfo:{
                mode : 'new' | 'replace';
                data : effectType
            }
            // tabInfo : {
            //     tab : tabType,
            //     effect: effectType
            // }
            // tabInfo : tabType
        }
    }
    changePrompts : {
        set:{
            newNote :{
                simple : (tabIndex:number,noteIndex:number,instrument:instrumentProperty,synth : synthName, octave : number)=>void,
                fretboard : (tabIndex:number,noteIndex:number,instrument:instrumentProperty,synth : synthName, octave : number)=>void,
            },
            // save :(tabIndex:number)=>void,
            save : {
                tab : (tabIndex:number)=>void,
                // effect : (effectIndex:number = -1)=>void
                effect : {
                    byIndex:(effectIndex:number)=>void,
                    byInput:(effectIn:effectType)=>void,
                    reset:()=>void,
                }
            }
            load : {
                tab : ()=>void,
                effect : ()=>void
            }
            // load : ()=>void,
            effect : (mode:'new' | 'replace')=>void,
            tab : ()=>void
        }
        // set : (promptSetting : promptTypes)=>void,
        // newNote:{
        //     simple:(notePromptValues : {noteValue:note,tabIndex:number,noteIndex:number})=>void
        // }
        // close :()=>void
        close : {
            standard : ()=>void,
            loadPrompt : (key : string,type:'tab'|'effect')=>void
        }
    };
}