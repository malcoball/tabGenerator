import { useState, useContext, useRef } from 'react';
import { ContextData, dataTypes, DataContext } from './FretboardExtras/FretboardContext';
import { Instruments, instrumentProperty } from '../../../Data/Music/Instruments';
import { noteLengths } from '../../../Data/@types/types';
import { conversions } from '../../../Data/StaticFunctions';
import NewNotePromptSimple from './NewNotePromptSimple';
import NotePromptShowNote from './NotePromptShowNote';
import { AppContext } from '../../../Data/AppContent';
import {getFretMarkers, Frets, FretDots } from './FretboardExtras/FretboardExtras';
import PromptBehind from '../PromptBehind';
import './NewNotePromptStyle/NewNoteFretboardStyle.css';




const String = (props:{stringName:string,fretAmount:number,breakPoint:number})=>{
    const stringClass = props.stringName.charAt(0) === "G" ? 'guitarStrings' : 'bassStrings';
    return (
        <div className={`string ${stringClass}`}>
            <Frets fretAmount={props.fretAmount} stringName={props.stringName} breakPoint={props.breakPoint}/>
        </div>
    )
}

const Strings = ()=>{
    const context = useContext(DataContext);
    if (!context) throw Error("");
    const showPrompt = context.noteHighlightData.showPrompt;

    const {stringAmount,fretAmount,breakPoints,stringNames,fretBoard} = context.data.instrument;
    const fretNumber = context.noteHighlightData.fretNumber;
    const number = context.noteHighlightData.number;
    const note = context.noteHighlightData.note;
    const StringElements = [];
    const FretMarkers = [];


    // Create the strings dug. Who's dug?
    for (let i = stringAmount-1; i > -1; i--){
        StringElements.push(<String key={"string"+i} breakPoint={breakPoints[i]} fretAmount={fretAmount}  stringName={fretBoard.stringIds[i]}/>)
    }
    // Create the fret markers/little circles
    for (let i = 0; i < fretAmount; i++){
        const value = getFretMarkers(i);
        FretMarkers.push(
            <div className='fretDotsContainer' key={'dot'+i}>
                <FretDots markerAmount={value}/>
            </div>)
    }
    return (
        <div className='stringsContainer'>
            {showPrompt && <NotePromptShowNote fretNumber={fretNumber} number={number} note={note}/>}

            {StringElements}
            <div className="fretMarkersContainer">
                {FretMarkers}
            </div>
        </div>
    )
}

const NeckHeader = ()=>{
    const context = useContext(DataContext);
    if (!context) throw Error("duh");
    const StringName = context.data.instrument.stringNames.map((name,int)=><span key={"neck"+int}>{name}</span>)
    return (
        <div className={`headerContainer ${context.data.instrument.name}`}>
            {StringName}
        </div>
    )
}
const NewNotePromptFretboard = ()=>{
    const context = useContext(AppContext);
    if (!context) throw Error('not loaded');
    const contextData = context.getPrompts.newNote();
    let instrument: instrumentProperty = contextData.instrument === 'bass' ? 'bass' : 'guitar'; 

    // const instrument : instrumentProperty = contextData.instrument; // This should be put in the context data when everything works.
    const [data,setData] = useState<ContextData>({
        highlightedNote : -1,
        selectedNote : contextData.noteValue.note,
        selectedLength : contextData.noteValue.length,
        selectedSynth : contextData.synth,
        instrument : Instruments[instrument],
        rootNote : conversions.noteLetterTo.number(Instruments[instrument].rootNote),
        octave : contextData.octave
    })
    const [noteHighlightData,setNoteHighlight] = useState({
        showPrompt : false,
        fretNumber : 2,
        number : 2,
        note : "A#"
    })
    const updateState=(valueIn:string|number,target:dataTypes)=>{
        const valueNew = {...data};
        switch(target){
            case 'highlightedNote': valueNew.highlightedNote = parseInt(valueIn+""); break;
            case 'selectedNote': valueNew.selectedNote = valueIn+""; break;
            case 'selectedLength' : console.error(`${valueIn} : can't be used in updateState, use updateSelectedLength instead`); break;
            default : console.log(`get that damn ${target} outta here`); break;
        }
        setData(valueNew);
    }
    const changeNoteHighlight = (fretNumber:number,number:number,note:string)=>{

        const out = {
            showPrompt : true,
            fretNumber : fretNumber,
            number : number,
            note : note
        }
        setNoteHighlight(out);
    }
    const closeNoteHighlight = ()=>{
        const out = {...noteHighlightData};
        out.showPrompt = false;
        setNoteHighlight(out);
    }

    const updateSelectedLength = (value:noteLengths)=>{
        const valueNew = {...data};
        valueNew.selectedLength = value;
        setData(valueNew);
    }
    const updateTab = ()=>{
        const noteOut = data.selectedNote
        context.changeTabs.singleNote.change(contextData.tabIndex,contextData.noteIndex,{note:noteOut,length:data.selectedLength})
        context.changePrompts.close.standard();
    }

    return(
        <div className="notePromptContainer">
            <div id="newNotePromptFretboard">
                <PromptBehind closeFunc={context.changePrompts.close.standard}/>
                <DataContext.Provider value={{data,updateState,updateTab,updateSelectedLength,noteHighlightData,changeNoteHighlight,closeNoteHighlight}}>
                    <NeckHeader/>
                    <Strings/>
                    <NewNotePromptSimple/>
                </DataContext.Provider>
            </div>
        </div>

    )
}

export default NewNotePromptFretboard;