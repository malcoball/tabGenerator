import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../../../Data/AppContent";
import { note, noteLengthDisplays, noteLengths } from "../../../../../../Data/@types/types";
import { conversions } from "../../../../../../Data/StaticFunctions";
import NewNotePrompt from "../../../../../Prompts/NewNotePrompt";

type TabItemProps = {
    value : string ,
    state : "playing" | "played" | "notPlayed",
    tabIndex : number,
    noteIndex : number,
    shortestLength : noteLengths,
    showNoteLengths : noteLengthDisplays,
    noteLength : noteLengths,
}

const TabItem = (props:TabItemProps)=>{
    const {value,state,tabIndex,noteIndex,noteLength,shortestLength} = props;
    console.log("value : ",value);
    const [showPrompt,setShowPrompt] = useState(false);
    const context = useContext(AppContext);
    if (!context){
        throw new Error(
            'This cant be used here, firgure that one out loser'
        )
    };
    const getNoteValue = context.getTabs.single.note(tabIndex,noteIndex);
    
    const handleClick = ()=>{
        setShowPrompt(true);

    }
    const closePrompt = ()=>{
        setShowPrompt(false);
    }
    // Could be optimised 
    let displayValue ; 
    const valueInt = parseInt(value);
    if (!isNaN(valueInt)){
        displayValue = valueInt < 0 ? "D" : value;
    } else {
        displayValue = "-";
    }
    const noteLengths = conversions.length.toTabShorten(noteLength,shortestLength);
    const arrNew = [...Array(noteLengths)];
    // Current way to toggle multi items, could also be optimised
    const singleItem = <td id="TabItem" className={state}>{displayValue}</td>;
    const noteLengthDisplay = props.showNoteLengths !== "compressed" ? arrNew.map(()=> singleItem) : <></>;
    
    return (
        <div onClick={handleClick}>
            <td  id="TabItem" className={state}>{displayValue}</td>
            {noteLengthDisplay}
            {showPrompt && <NewNotePrompt tabIndex={tabIndex} 
                            noteIndex={noteIndex} noteChange={context.changeTabs.singleNote.change} 
                            closeFunc={closePrompt} noteValue={getNoteValue}/>}
        </div>
    )
}
export default TabItem;