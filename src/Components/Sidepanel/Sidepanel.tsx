import { useState, useContext } from "react";
import BtnIcon from '../Icons/Buttons/BtnIcon';
import './Style/SidepanelStyle.css';
import PromptSelect from "./PromptSelect";
import { AppContext } from "../../Data/AppContent";

const Sidepanel = ()=>{
    const context = useContext(AppContext);
    if (!context) throw Error("sthap");
    const [showPrompt,setShowPrompt] = useState<''|'new'|'load'>('');
    const closeFunc = ()=>{
        setShowPrompt('');
    }
    const newBtnClick = ()=>{
        showPrompt === '' ? setShowPrompt('new') : setShowPrompt('');
        
    }
    const loadBtnClick = ()=>{
        showPrompt === '' ? setShowPrompt('load') : setShowPrompt('');
    }
    return <aside id="Sidepanel" className='bgCol6'>
        <div className="iconsContainer">
            <div className="iconContainer bgCol6"><BtnIcon icon="guitarHead"/></div>
            <div className="iconContainer bgCol6"><BtnIcon onClick={newBtnClick} icon="add"/>
                {showPrompt === 'new' && <PromptSelect prompts={[{title:'New tab ? ',type:'newTab'},{title:'New effect ? ',type:'newEffect'}]} closeFunc={closeFunc}/>}
            </div>
            <div className="iconContainer bgCol6"><BtnIcon onClick={loadBtnClick} icon="save"/>
                {showPrompt === 'load' && <PromptSelect prompts={[{title:'Load tab ? ',type:'loadTab'}]} closeFunc={closeFunc}/>}
            </div>
            {/* <div className="iconContainer bgCol6"><BtnIcon icon="switch"/></div> */}
        </div>
        {/* {showPrompt && <NewTabPrompt closeFunc={()=>{setShowPrompt(false)}}/>} */}
        {/* {showPrompt && <NewEffectsPrompt closeFunc={()=>{setShowPrompt(false)}}/>} */}
    </aside>
}
export default Sidepanel;