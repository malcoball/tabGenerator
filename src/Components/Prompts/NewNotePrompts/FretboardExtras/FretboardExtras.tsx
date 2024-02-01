import { useRef, useContext } from "react";
import { conversions } from "../../../../Data/StaticFunctions";
import { DataContext } from "./FretboardContext";

export const getFretMarkers = (fretNumber:number)=>{
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
const Fret = (props:{value:number,fretNumber:number,onClick:(value:number)=>void,stringName:string,active:boolean,stringId:string})=>{
    const context = useContext(DataContext);
    const {value,onClick,stringName,fretNumber,active} = props;
    const letterValue = useRef(conversions.noteTo.noteLetter((value+4).toString()))
    const onHover = ()=>{
        context.changeNoteHighlight(fretNumber,value,letterValue.current);
    }
    const offHover = ()=>{
        context.closeNoteHighlight();
    }
    let className = props.active ? 'active' : '';
    if (fretNumber === 0) className += 'openString'
    const stringClass = stringName.charAt(0) === "G" ? 'guitarString' : 'bassString';
    return (
        <div className={`fret ${className}`} onMouseLeave={offHover} onMouseEnter={onHover} onClick={()=>{onClick(value)}}>
            <div className="fretMarker">
            </div>

            <div className={`stringMarker ${stringClass}`} id={props.stringId}>
                <div className="stringOverlay"></div>
            </div>
            {active && <span id="selectedNote">{letterValue.current}</span>}
            <div className="mouseInteract"></div>
        </div>
    )
}
export const Frets = (props:{fretAmount: number,stringName:string,breakPoint:number})=>{
    const context = useContext(DataContext);
    const FretElements = [];
    const onClick = (value:number)=>{
        console.log("listen");
        context.updateState(value,'selectedNote');
    }
    for (let i = 0; i < props.fretAmount; i++){
        const value = i + props.breakPoint;
        const active = value === parseInt(context.data.selectedNote) ? true : false;
        // const width = start + i * change;
        FretElements.push(
            <Fret stringId={props.stringName} key={'fret'+i} fretNumber={i} active={active} value={value} stringName={props.stringName} onClick={onClick}/>
            )
        }
    return (
        <>
                {FretElements}
            <div className="stringShadow" id={props.stringName}></div>
        </>
    )
}

export const FretDots = (props:{markerAmount : number})=>{
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