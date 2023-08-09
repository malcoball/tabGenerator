import { useEffect, useMemo, useState } from "react"
import { breakPoints } from "../../../../../Data/StaticFunctions"
import TabItem from "./TabItem/TabItem"
import { instrumentName, noteLengthDisplays, noteLengths } from "../../../../../Data/@types/types"
type headerProps = {
    data : string[]
}
export const TabColumnHeader = (props:headerProps)=>{
    const data = props.data.map((item,index)=><th key={index}>{item}</th>)
    return (
        <tr>
            {data}
        </tr>
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
    highlight : boolean
    showNoteLengths : noteLengthDisplays
}


export const TabColumnCell = (props:cellProps)=>{
    const {instrument,line,noteLength,shortestNoteLength,tabIndex,change,noteIndex,showNoteLengths} = props;
    
    const parseData = useMemo(()=>{
        return(breakPoints.line.parseFull(props.line,props.instrument))
    },[props.change])

    const data = parseData.map((item,index)=>
    <TabItem showNoteLengths={showNoteLengths} 
            shortestLength={shortestNoteLength}
            noteLength={noteLength} key={index} noteIndex={noteIndex}  
            tabIndex={tabIndex} value={item} state="notPlayed"/>)
    const highlightClass = props.highlight ? "highlight" : "";
    return (
        <tr className={highlightClass}>
            {data}
            {showNoteLengths === "compressed" && <td>{noteLength}</td> }
        </tr>
    )
}