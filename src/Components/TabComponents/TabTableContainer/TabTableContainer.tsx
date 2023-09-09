import { useContext, useRef, useState } from "react";
import { AppContext } from "../../../Data/AppContent";
import TabTable from "./TabTable/TabTable"
import './TabTableContStyle/TabTableContainerStyle.css'


const TabTableContainer = ()=>{
    const context = useContext(AppContext);
    if (!context){
        throw new Error(
            'This cant be used here, firgure that one out loser'
        )
    };



    const tables = context.tabs.map((item,index)=><TabTable key={index} tab={item}/>)
    return (
        <div id="TabTableContainer">
            <h2>I hold all of these little tabs</h2>
            <div id="tables">
                {tables}
            </div>
        </div>
    )
}
export default TabTableContainer;