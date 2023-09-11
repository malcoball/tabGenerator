import {createContext} from 'react';
import { instrument, noteLengths } from "../../../../Data/@types/types";
import { Instruments } from '../../../../Data/Music/Instruments';
export type dataTypes = 'highlightedNote' |'selectedNote'|'selectedLength'|'fretAmount'|'stringAmount'|'stringNames';
export type ContextData = {
    highlightedNote: number;
    selectedNote: string;
    selectedLength: noteLengths;
    instrument : instrument;
    rootNote : number;
}
export type ContextType = {
    data :ContextData,
    updateState : (valueIn:string|number,target:dataTypes)=>void,
    updateSelectedLength : (valueIn:noteLengths)=>void,
    updateTab : ()=>void

}  ;
export const DataContext = createContext<ContextType>({
    data : {
        highlightedNote : -1,
        selectedNote : "",
        selectedLength : '8n',
        instrument : Instruments.bass,
        rootNote : -1
    },
    updateState : ()=>{console.log("set me up pls")},
    updateSelectedLength : ()=>{console.log('Set me up geezer')},
    updateTab : ()=>{console.log("set me up pls")},
});