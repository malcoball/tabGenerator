import { useEffect, useMemo, useState } from "react"
import { breakPoints } from "../../../../../Data/StaticFunctions"
import TabItem from "./TabItem/TabItem"
import { instrumentName, noteLengths } from "../../../../../Data/@types/types"
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
    tabIndex : number,
    change : boolean,
    noteIndex : number,
    highlight : boolean
}


export const TabColumnCell = (props:cellProps)=>{
    const {instrument,line,noteLength,tabIndex,change,noteIndex,highlight} = props;
    
    const parseData = useMemo(()=>{
        return(breakPoints.line.parseFull(props.line,props.instrument))
    },[props.change])

    const data = parseData.map((item,index)=><TabItem noteLength={noteLength} key={index} noteIndex={noteIndex} tabIndex={tabIndex} value={item} state="notPlayed"/>)
    const highlightClass = props.highlight ? "highlight" : "";
    return (
        <tr className={highlightClass}>
            {data}
        </tr>
    )
}