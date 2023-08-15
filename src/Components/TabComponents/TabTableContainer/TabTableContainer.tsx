import { useContext, useRef, useState } from "react";
import { AppContext } from "../../../Data/AppContent";
import TabTable from "./TabTable/TabTable"
import './TabTableContStyle/TabTableContainerStyle.css'
import NewTabPrompt from "../../Prompts/NewTabPrompt";


const TabTableContainer = ()=>{
    const [tabLength,setTabLength] = useState(4); // Used when creating a new tab
    const [showPrompt,setShowPrompt] = useState(false);
    const showPromptRef = useRef(false);
    const context = useContext(AppContext);
    if (!context){
        throw new Error(
            'This cant be used here, firgure that one out loser'
        )
    };

    const handleBtnClick = ()=>{
        setShowPrompt(!showPrompt);
    }

    const tables = context.tabs.map((item,index)=><TabTable key={index} tab={item}/>)
    return (
        <div id="TabTableContainer">
            <h2>I hold all of these little tabs</h2>
            <input
                value={tabLength}
                onChange={(e)=>{setTabLength(parseInt(e.target.value))}}
            />
            <button onClick={handleBtnClick}>New tab pls</button>
            <div id="tables">
                {tables}
            </div>
            {showPrompt && <NewTabPrompt closeFunc={()=>{setShowPrompt(false)}}/>}
        </div>
    )
}
export default TabTableContainer;