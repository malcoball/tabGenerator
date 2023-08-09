import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../../../Data/AppContent";
import { note, noteLengths } from "../../../../../../Data/@types/types";
import { conversions } from "../../../../../../Data/StaticFunctions";
import NewNotePrompt from "../../../../../Prompts/NewNotePrompt";

type TabItemProps = {
    value : string ,
    state : "playing" | "played" | "notPlayed",
    tabIndex : number,
    noteIndex : number,
    noteLength : noteLengths,
}

const TabItem = (props:TabItemProps)=>{
    const {value,state,tabIndex,noteIndex,noteLength} = props;
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

        // const noteOut : note = {note:'4',length:'16n'}

        // context.changeTabs.singleNote(tabIndex,noteIndex,noteOut);
    }
    const closePrompt = ()=>{
        setShowPrompt(false);
    }
    // Could be optimised 
    const noteLengths = conversions.length.toTabShorten(noteLength);
    const arrNew = [...Array(noteLengths)];
    const noteLengthDisplay = arrNew.map(()=><td id="TabItem" className={state}>{value !== "-" ? value : "-"}</td>)

    
    return (
        <div onClick={handleClick}>
            <td  id="TabItem" className={state}>{value}</td>
            {noteLengthDisplay}
            {showPrompt && <NewNotePrompt tabIndex={tabIndex} noteIndex={noteIndex} noteChange={context.changeTabs.singleNote} closeFunc={closePrompt} noteValue={getNoteValue}/>}
        </div>
    )
}
export default TabItem;