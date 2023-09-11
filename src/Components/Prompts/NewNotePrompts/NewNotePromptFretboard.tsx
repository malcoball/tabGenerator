import { useState, useContext, useRef } from 'react';
import { ContextData, dataTypes, DataContext } from './FretboardExtras/FretboardContext';
import { Instruments, instrumentProperty } from '../../../Data/Music/Instruments';
import { noteLengths } from '../../../Data/@types/types';
import { conversions } from '../../../Data/StaticFunctions';
import NewNotePromptSimple from './NewNotePromptSimple';
import './NewNotePromptStyle/NewNoteFretboardStyle.css';
import NotePromptShowNote from './NotePromptShowNote';
import { AppContext } from '../../../Data/AppContent';
import {getFretMarkers } from './FretboardExtras/FretboardExtras';

const FretDots = (props:{markerAmount : number})=>{
    const Markers = [];
    for (let i = 0;i < props.markerAmount; i++){
        Markers.push(<span key={'fretDots'+i}></span>)
    }
    return (
        <>
            {Markers}
        </>
    )
}

const Fret = (props:{width:number,value:number,fretNumber:number,onClick:(value:number)=>void,stringName:string,active:boolean,stringId:string})=>{
    const {width,value,onClick,stringName,fretNumber,active} = props;
    const [showPrompt,setShowPrompt] = useState(false);
    const letterValue = useRef(conversions.noteTo.noteLetter((value+4).toString()))
    const onHover = ()=>{
        setShowPrompt(true);
    }
    const offHover = ()=>{
        setShowPrompt(false);
    }
    let className = props.active ? 'active' : '';
    const stringClass = props.stringName.charAt(0) === "G" ? 'guitarString' : 'bassString';
    return (
        <div style={{width: width}} className={`fret ${className}`} onMouseLeave={offHover} onMouseEnter={onHover} onClick={()=>{onClick(value)}}>
            <div className="fretMarker">
            </div>

            <div className={`stringMarker ${stringClass}`} id={props.stringId}>
                <div className="stringOverlay"></div>
            </div>
            {showPrompt && <NotePromptShowNote fretNumber={fretNumber} number={value} note={letterValue.current}/>}
            {active && <span id="selectedNote">{letterValue.current}</span>}
        </div>
    )
}

const Frets = (props:{fretAmount: number,stringName:string,breakPoint:number})=>{
    const context = useContext(DataContext);
    const FretElements = [];
    const widths  = {start :context.data.instrument.fretBoard.widths.start, change :context.data.instrument.fretBoard.widths.change};
    const {start,change} = widths;
    const onClick = (value:number)=>{
        context.updateState(value,'selectedNote');
    }
    for (let i = 0; i < props.fretAmount; i++){
        const value = i + props.breakPoint;
        const active = value === parseInt(context.data.selectedNote) ? true : false;
        FretElements.push(
            <Fret stringId={props.stringName} key={'fret'+i} fretNumber={i} active={active} width={start + i * change} value={value} stringName={props.stringName} onClick={onClick}/>
        )
    }
    return (
        <>
            {FretElements}
            <div className="stringShadow" id={props.stringName}></div>
        </>
    )
}

const String = (props:{stringName:string,fretAmount:number,breakPoint:number})=>{
    // console.log(`stringNames : ${props.stringName}`);
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

    const {stringAmount,fretAmount,breakPoints,stringNames,fretBoard} = context.data.instrument;
    const StringElements = [];
    const FretMarkers = [];

    // Create the strings dug. Who's dug?
    for (let i = stringAmount-1; i > -1; i--){
        StringElements.push(<String key={"string"+i} breakPoint={breakPoints[i]} fretAmount={fretAmount}  stringName={fretBoard.stringIds[i]}/>)
    }
    // Create the fret markers/little circles
    for (let i = 0; i < fretAmount; i++){
        const width = fretBoard.widths.start + fretBoard.widths.change * i;
        const value = getFretMarkers(i);
        FretMarkers.push(
            <div className='fretDotsContainer' key={'dot'+i} style={{width:width}}>
                <FretDots markerAmount={value}/>
            </div>)
    }
    return (
        <div className='stringsContainer'>
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
        <div className='headerContainer'>
            {StringName}
        </div>
    )
}
const NewNotePromptFretboard = ()=>{
    const context = useContext(AppContext);
    if (!context) throw Error('not loaded');
    const contextData = context.getPrompts.newNote();
    const instrument : instrumentProperty = 'guitar'; // This should be put in the context data when everything works.
    const [data,setData] = useState<ContextData>({
        highlightedNote : -1,
        selectedNote : contextData.noteValue.note,
        selectedLength : contextData.noteValue.length,
        instrument : Instruments[instrument],
        rootNote : conversions.noteLetterTo.number(Instruments[instrument].rootNote)
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
    const updateSelectedLength = (value:noteLengths)=>{
        const valueNew = {...data};
        valueNew.selectedLength = value;
        setData(valueNew);
    }
    const updateTab = ()=>{
        const noteOut = data.selectedNote
        context.changeTabs.singleNote.change(contextData.tabIndex,contextData.noteIndex,{note:noteOut,length:data.selectedLength})
        context.changePrompts.close();
    }
    return(
        <div id="newNotePromptFretboard">
            <DataContext.Provider value={{data,updateState,updateTab,updateSelectedLength}}>
                <NeckHeader/>
                <Strings/>
                <NewNotePromptSimple/>
            </DataContext.Provider>
        </div>
    )
}

export default NewNotePromptFretboard;