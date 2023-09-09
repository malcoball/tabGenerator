import React,{ useState, createContext, useContext, useRef } from 'react';
import { Instruments } from '../../../Data/Music/Instruments';
import { noteLengths } from '../../../Data/@types/types';
import { conversions } from '../../../Data/StaticFunctions';
import NewNotePromptSimple from './NewNotePromptSimple';
import './NewNotePromptStyle/NewNoteFretboardStyle.css';
import NotePromptShowNote from './NotePromptShowNote';
import { AppContext } from '../../../Data/AppContent';
const stringNamesIds = {
    bass : [
        'BassE','BassA','BassD','BassG'
    ],
    guitar : [
        'GuitarE','GuitarA','GuitarD','GuitarG','GuitarB','Guitare'
    ]
}
const fretWidths = {
    bass : {
        start : 92,
        change : -2.5
    },
    guitar : 64,
}
const getFretMarkers = (fretNumber:number)=>{
    let fretNumberParse = fretNumber;
    if (fretNumberParse > 12){
        fretNumberParse -= 12;
    }
    let out = 0;
    if (fretNumberParse > 2 && fretNumberParse < 10) {
        if (fretNumberParse % 2 === 1) out = 1;
    } else 
    if (fretNumberParse === 12) out = 2;
    return out;
}


type promptProps = {
    stringAmount : number,
    fretAmount : number
}
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

const Fret = (props:{width:number,value:number,onClick:(value:number)=>void,onHover:(value:number)=>void,stringName:string})=>{
    const {width,value,onClick,stringName} = props;
    const [showPrompt,setShowPrompt] = useState(false);
    const letterValue = useRef(conversions.noteTo.noteLetter(value.toString()))
    const onHover = ()=>{
        props.onHover(value);
        setShowPrompt(true);
    }
    const offHover = ()=>{
        setShowPrompt(false);
    }
    return (
        <div style={{width: width}} className='fret' onMouseLeave={offHover} onMouseEnter={onHover} onClick={()=>{onClick(value)}}>
            <div className="fretMarker">
            </div>

            <div className="stringMarker bassString" id={stringName}>
                <div className="stringOverlay"></div>
            </div>
            {showPrompt && <NotePromptShowNote number={value} note={letterValue.current}/>}
        </div>
    )
}

const Frets = (props:{fretAmount: number,stringName:string,breakPoint:number})=>{
    const context = useContext(DataContext);
    const FretElements = [];
    const widths  = {start : fretWidths.bass.start, change : fretWidths.bass.change};
    const {start,change} = widths;
    const onClick = (value:number)=>{
        context.updateState(value,'selectedNote');
    }
    const onHover = (value:number)=>{
        context.updateState(value,'highlightedNote');
    }
    for (let i = 0; i < props.fretAmount; i++){
        FretElements.push(
            <Fret key={'fret'+i} width={start + i * change} value={i + props.breakPoint} stringName={props.stringName} onClick={onClick} onHover={onHover}/>
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
    return (
        <div className="string bassStrings">
            <Frets fretAmount={props.fretAmount} stringName={props.stringName} breakPoint={props.breakPoint}/>
        </div>
    )
}
const Strings = ()=>{
    const context = useContext(DataContext);
    if (!context) throw Error("");
    const stringAmount = context.data.stringAmount;
    const fretAmount = context.data.fretAmount;
    const breakPoints = context.data.breakPoints;
    const StringElements = [];
    const FretMarkers = [];

    // Create the strings dug. Who's dug?
    for (let i = stringAmount-1; i > -1; i--){
        StringElements.push(<String key={"string"+i} breakPoint={breakPoints[i]} fretAmount={fretAmount}  stringName={stringNamesIds.bass[i]}/>)
    }
    // Create the fret markers/little circles
    for (let i = 0; i < fretAmount; i++){
        const width = fretWidths.bass.start + fretWidths.bass.change * i;
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
    const StringName = context.data.stringNames.map((name,int)=><span key={"neck"+int}>{name}</span>)
    return (
        <div className='headerContainer'>
            {StringName}
        </div>
    )
}
type dataTypes = 'highlightedNote' |'selectedNote'|'selectedLength'|'fretAmount'|'stringAmount'|'stringNames';
type ContextType = {
    data :{
        highlightedNote: number;
        selectedNote: string;
        selectedLength: noteLengths;
        fretAmount: number;
        stringAmount: number;
        stringNames : string[];
        breakPoints : number[]
    },
    updateState : (valueIn:string|number,target:dataTypes)=>void,
    updateTab : ()=>void

}  ;
export const DataContext = createContext<ContextType>({
    data : {
        highlightedNote : -1,
        selectedNote : "",
        selectedLength : '8n',
        fretAmount : -1,
        stringAmount : -1,
        stringNames : [],
        breakPoints : []
    },
    updateState : ()=>{console.log("set me up pls")},
    updateTab : ()=>{console.log("set me up pls")}
});

const NewNotePromptFretboard = ()=>{
    const context = useContext(AppContext);
    if (!context) throw Error('not loaded');
    const contextData = context.getPrompts.newNote();
    const [data,setData] = useState({
        highlightedNote : 12,
        selectedNote : contextData.noteValue.note,
        selectedLength : '8n',
        fretAmount : 26,
        stringNames : Instruments.bass.stringNames,
        breakPoints : Instruments.bass.breakPoints,
        stringAmount : Instruments.bass.breakPoints.length,

    })
    const updateState=(valueIn:string|number|boolean[]|noteLengths,target:dataTypes)=>{
        const valueNew = {...data};
        switch(target){
            case 'highlightedNote': valueNew.highlightedNote = parseInt(valueIn+""); break;
            case 'selectedNote': valueNew.selectedNote = valueIn+""; break;
            case 'selectedLength': 
                valueNew.selectedLength = valueIn
                break;
            case 'fretAmount': valueNew.fretAmount = parseInt(valueIn+""); break;
            case 'stringAmount': valueNew.stringAmount = parseInt(valueIn+""); break;
            default : console.log(`get that ${target} outta here`); break;
        }
        setData(valueNew);
    }
    const updateTab = ()=>{
        context.changeTabs.singleNote.change(contextData.tabIndex,contextData.noteIndex,{note:data.selectedNote,length:'8n'})
        context.changePrompts.close();
    }

    return(
        <div id="newNotePromptFretboard">
            <DataContext.Provider value={{data,updateState,updateTab}}>
                <NeckHeader/>
                <Strings/>
                <NewNotePromptSimple/>
            </DataContext.Provider>
        </div>
    )
}

export default NewNotePromptFretboard;