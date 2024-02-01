import {createContext} from 'react';
import { instrument, noteLengths, synthName } from "../../../../Data/@types/types";
import { Instruments } from '../../../../Data/Music/Instruments';
export type dataTypes = 'highlightedNote' |'selectedNote'|'selectedLength'|'fretAmount'|'stringAmount'|'stringNames';
export type ContextData = {
    highlightedNote: number;
    selectedNote: string;
    selectedLength: noteLengths;
    selectedSynth : synthName;
    instrument : instrument;
    rootNote : number;
    octave : number;
}
export type noteHighlightType = {
    showPrompt : boolean,
    fretNumber : number,
    number : number,
    note : string
}
export type ContextType = {
    data :ContextData,
    noteHighlightData : noteHighlightType,
    updateState : (valueIn:string|number,target:dataTypes)=>void,
    updateSelectedLength : (valueIn:noteLengths)=>void,
    updateTab : ()=>void,
    changeNoteHighlight : (fretNumber:number,number:number,note:string)=>void,
    closeNoteHighlight : ()=>void
}  ;
export const DataContext = createContext<ContextType>({
    data : {
        highlightedNote : -1,
        selectedNote : "",
        selectedLength : '8n',
        selectedSynth : 'AMSynth',
        instrument : Instruments.bass,
        rootNote : -1,
        octave : 1
    },
    noteHighlightData : {
        showPrompt : true,
        fretNumber : 2,
        number : 2,
        note : "A#"
    },
    updateState : ()=>{console.log("set me up pls")},
    updateSelectedLength : ()=>{console.log('Set me up geezer')},
    updateTab : ()=>{console.log("set me up pls")},
    changeNoteHighlight : ()=>{console.log("freedom is the only way")},
    closeNoteHighlight : ()=>{console.log("ye")},

});