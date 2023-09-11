import { useContext} from "react";
import { AppContext } from "../../../../../../Data/AppContent";
import { note, noteLengthDisplays, noteLengths } from "../../../../../../Data/@types/types";
import { conversions } from "../../../../../../Data/StaticFunctions";
import { instrumentProperty } from "../../../../../../Data/Music/Instruments";

type TabItemProps = {
    value : string ,
    state : "playing" | "played" | "notPlayed",
    tabIndex : number,
    noteIndex : number,
    instrumentName : instrumentProperty,
    shortestLength : noteLengths,
    showNoteLengths : noteLengthDisplays,
    noteLength : noteLengths,
    noteColor : string
}

const TabItem = (props:TabItemProps)=>{
    const {value,state,tabIndex,noteIndex,noteLength,shortestLength,instrumentName} = props;
    const context = useContext(AppContext);
    if (!context){
        throw new Error(
            'This cant be used here, firgure that one out loser'
        )
    };
    
    const handleClick = ()=>{
        // context.changePrompts.set.newNote.simple(tabIndex,noteIndex);
        context.changePrompts.set.newNote.fretboard(tabIndex,noteIndex,instrumentName);

    }

    // Could be optimised 
    let displayValue ; 
    const valueInt = parseInt(value);
    if (!isNaN(valueInt)){
        displayValue = valueInt < 0 ? "D" : value;
    } else {
        displayValue = "_";
    }
    const className = displayValue !== "_" ? "noteItem" : "";
    const noteLengths = conversions.length.toTabShorten(noteLength,shortestLength);
    const arrNew = [...Array(noteLengths)];
    // Current way to toggle multi items, could also be optimised
    const singleItem = <span id="TabItem" className={`${state}`}>{displayValue}</span>;
    const noteLengthDisplay = props.showNoteLengths !== "compressed" ? arrNew.map(()=> singleItem) : <></>;
    
    return (
        <div onClick={handleClick}>
            <span  id="TabItem" className={`${state} ${props.noteColor} ${className}`}>{displayValue}</span>
            {noteLengthDisplay}
        </div>
    )
}
export default TabItem;