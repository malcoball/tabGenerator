import {useState, useContext} from 'react';
import { AppContext } from '../../../Data/AppContent';
import SavedItemContainer from './SavedItemContainer';
import './Style/LoadPromptStyle.css';
import { keyMethods } from '../../../Data/StaticFunctions';
import PromptBehind from '../PromptBehind';

const LoadPrompt = (props:{type:'tab' | 'effect'})=>{
    const context = useContext(AppContext);
    if (!context) throw Error("context not loaded");
    const [selectedItem,setSelectedTab] = useState('');
    const btnClick = ()=>{
        const keyOut = keyMethods.fileKey.create(selectedItem,props.type);
        // console.log("keyOut : ",keyOut);
        context.changePrompts.close.loadPrompt(keyOut,props.type);
    }
    return (
        <div className="loadpromptContainer">
            <div className="loadPrompt bgCol7">
                <SavedItemContainer dataType={props.type} setState={setSelectedTab}/>
                <h5>Load tab</h5>
                <button onClick={btnClick}>Load in {selectedItem}</button>
            </div>
            <PromptBehind closeFunc={()=>{context.changePrompts.close.standard()}}/>
        </div>
    )
}

export default LoadPrompt;