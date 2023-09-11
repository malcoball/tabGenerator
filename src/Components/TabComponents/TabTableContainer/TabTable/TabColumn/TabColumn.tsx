import { useEffect, useMemo, useState } from "react"
import { breakPoints } from "../../../../../Data/StaticFunctions"
import TabItem from "./TabItem/TabItem"
import { instrumentName, noteLengthDisplays, noteLengths } from "../../../../../Data/@types/types"
type headerProps = {
    data : string[],
    noteClass : string,
}
export const TabColumnHeader = (props:headerProps)=>{
    const data = props.data.map((item,index)=><span className="header" key={index}>{item}</span>)
    return (
        <div className={`tableRow tableHeader ${props.noteClass}`}>
            {data}
        </div>
    )
}

type cellProps = {
    instrument : instrumentName,
    line : string,
    noteLength:noteLengths,
    shortestNoteLength : noteLengths,
    tabIndex : number,
    change : boolean,
    noteIndex : number,
    activeIndex : number
    showNoteLengths : noteLengthDisplays
    noteColor : string,
    lengthColor : string
}


export const TabColumnCell = (props:cellProps)=>{
    const {instrument,line,noteLength,shortestNoteLength,tabIndex,change,noteIndex,showNoteLengths} = props;
    
    const parseData = useMemo(()=>{
        return(breakPoints.line.parseFull(line,instrument))
    },[change])

    const data = parseData.map((item,index)=>
    <TabItem showNoteLengths={showNoteLengths}
            instrumentName={instrument} 
            shortestLength={shortestNoteLength}
            noteLength={noteLength} key={index} noteIndex={noteIndex}  
            tabIndex={tabIndex} value={item} noteColor={props.noteColor} state="notPlayed"/>)
    // const highlightClass = props.activeIndex === noteIndex ? " highlight" : "";
    let highlightClass = "";
    if (props.activeIndex === noteIndex) highlightClass = "highlight"; else 
    if (props.activeIndex > noteIndex) highlightClass = "highlighted";
    return (
        <div className={"tableRow "+highlightClass}>
            {data}
            {showNoteLengths === "compressed" && <span className={`noteTiming ${props.lengthColor}`}>{noteLength}</span> }
        </div>
    )
}