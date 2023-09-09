import { useState, useContext } from "react";
import BtnIcon from '../Icons/Buttons/BtnIcon';
import './Style/SidepanelStyle.css';
import PromptSelect from "./PromptSelect";
import { AppContext } from "../../Data/AppContent";

const Sidepanel = ()=>{
    const context = useContext(AppContext);
    if (!context) throw Error("sthap");
    const [showPrompt,setShowPrompt] = useState(false);
    const newBtnClick = ()=>{
        setShowPrompt(!showPrompt);
    }
    const loadBtnClick = ()=>{
        context.changePrompts.set.load();
    }
    return <aside id="Sidepanel" className='bgCol6'>
        <div className="iconsContainer">
            <div className="iconContainer bgCol6"><BtnIcon icon="guitarHead"/></div>
            <div className="iconContainer bgCol6"><BtnIcon onClick={newBtnClick} icon="add"/></div>
            <div className="iconContainer bgCol6"><BtnIcon onClick={loadBtnClick} icon="save"/></div>
            <div className="iconContainer bgCol6"><BtnIcon icon="switch"/></div>
        </div>
        {/* {showPrompt && <NewTabPrompt closeFunc={()=>{setShowPrompt(false)}}/>} */}
        {/* {showPrompt && <NewEffectsPrompt closeFunc={()=>{setShowPrompt(false)}}/>} */}
        {showPrompt && <PromptSelect closeFunc={()=>{setShowPrompt(false)}}/>}
    </aside>
}
export default Sidepanel;