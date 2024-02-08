// import {createContext} from 'react';
import * as React from 'react';
import { instrument, noteLengths, synthName } from "../../../../Data/@types/types";
import { Instruments } from '../../../../Data/Music/Instruments';
import { AppContext } from '../../../../Data/AppContent';

type dataTypes = 'highlightedNote' |'selectedNote'|'selectedLength'|'fretAmount'|'stringAmount'|'stringNames';
type ContextData = {
    highlightedNote: number;
    selectedNote: string;
    selectedLength: noteLengths;
    selectedSynth : synthName;
    instrument : instrument;
    rootNote : number;
    octave : number;
}
type noteHighlightType = {
    showPrompt : boolean,
    fretNumber : number,
    number : number,
    note : string
}
type FretboardContextType = {
    noteData :ContextData,
    noteHighlightData : noteHighlightType,
    updateNoteData : (valueIn:string|number,target:dataTypes)=>void,
    updateSelectedLength : (valueIn:noteLengths)=>void,
    updateTab : ()=>void,
    changeNoteHighlight : (fretNumber:number,number:number,note:string)=>void,
    closeNoteHighlight : ()=>void
}

interface Props {
    children : React.ReactNode;
}

export const FretboardContext = React.createContext<FretboardContextType | null>(null);

const FretboardProvider: React.FC<Props> = ({children})=>{
    const globalData = React.useContext(AppContext);
    if (globalData === null) throw new Error("it's null");
    const newNote = globalData.getPrompts.newNote();
    const instrumentType = Instruments.getSingle.all(newNote.instrument);
    const [noteData,setNoteData] = React.useState<ContextData>({
        // This controls the data which will be outputted back to the global context
        highlightedNote : 1,
        selectedNote : newNote.noteValue.note,
        selectedLength : newNote.noteValue.length,
        selectedSynth : newNote.synth,
        instrument : instrumentType,
        rootNote : 2,
        octave : newNote.octave
    })
    const [noteHighlightData,setNoteHighlightData] = React.useState<noteHighlightType>({
        // This is just here for the highlight element to know what to show, it should be constantly updated
        showPrompt : false,
        fretNumber : 1,
        number : 1,
        note : "A2"
    })
    const updateNoteData = (valueIn:string|number,target:dataTypes)=>{
        const out = {...noteData};
        switch(target){
            case 'highlightedNote' : out.highlightedNote = parseInt(valueIn+""); break;
            case 'selectedNote' : out.selectedNote = valueIn+""; break;
            case 'selectedLength' : console.error(`${valueIn} : can't be used in updateState, use updateSelectedLength instead`); break;
            default : console.log(`get that damn ${target} outta here`); break;
        }
        setNoteData(out);
    }
    const changeNoteHighlight = (fretNumber:number,number:number,note:string)=>{
        const out = {
            showPrompt : true,
            fretNumber: fretNumber,
            number : number,
            note : note
        }
        setNoteHighlightData(out);
    }
    const closeNoteHighlight = ()=>{
        const out = {...noteHighlightData};
        out.showPrompt = false;
        setNoteHighlightData(out);
    }

    const updateSelectedLength = (value:noteLengths)=>{
        const valueNew = {...noteData};
        valueNew.selectedLength = value;
        setNoteData(valueNew);
    }

    const updateTab = ()=>{

        const noteOut = noteData.selectedNote;
        globalData.changeTabs.singleNote.change(newNote.tabIndex,newNote.noteIndex,{note:noteOut,length:noteData.selectedLength});
        globalData.changePrompts.close.standard();
    }
    return (
        <FretboardContext.Provider value={{noteData,noteHighlightData,updateNoteData,changeNoteHighlight,closeNoteHighlight,updateTab,updateSelectedLength}}>
            {children}
        </FretboardContext.Provider>
    )
}

export default FretboardProvider;