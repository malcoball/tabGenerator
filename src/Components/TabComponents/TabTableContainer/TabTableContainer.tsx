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
            <div id="tables">
                {tables}
            </div>
        </div>
    )
}
export default TabTableContainer;