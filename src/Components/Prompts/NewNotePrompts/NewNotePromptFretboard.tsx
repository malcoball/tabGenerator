import { useState, useContext, useRef } from 'react';
import FretboardProvider, { FretboardContext } from './FretboardExtras/FretboardContext';
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
    const context = useContext(FretboardContext);
    if (!context) throw Error("");
    const showPrompt = context.noteHighlightData.showPrompt;

    const {stringAmount,fretAmount,breakPoints,stringNames,fretBoard} = context.noteData.instrument;
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
    const context = useContext(FretboardContext);
    // const context = useContext(DataContext);
    if (!context) throw Error("duh");
    const StringName = context.noteData.instrument.stringNames.map((name,int)=><span key={"neck"+int}>{name}</span>)
    return (
        <div className={`headerContainer ${context.noteData.instrument.name}`}>
            {StringName}
        </div>
    )
}
const NewNotePromptFretboard = ()=>{
    const context = useContext(AppContext);
    if (!context) throw Error('not loaded');
    const contextData = context.getPrompts.newNote();
    return(
        <div className="notePromptContainer">
            <div id="newNotePromptFretboard">
                <PromptBehind closeFunc={context.changePrompts.close.standard}/>
                {/* <DataContext.Provider value={{data,updateState,updateTab,updateSelectedLength,noteHighlightData,changeNoteHighlight,closeNoteHighlight}}> */}
                <FretboardProvider>
                    <NeckHeader/>
                    <Strings/>
                    <NewNotePromptSimple/>
                </FretboardProvider>
                {/* </DataContext.Provider> */}
            </div>
        </div>

    )
}

export default NewNotePromptFretboard;