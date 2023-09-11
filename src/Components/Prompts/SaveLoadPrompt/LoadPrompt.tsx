import {useState, useContext} from 'react';
import { AppContext } from '../../../Data/AppContent';
import SavedItemContainer from './SavedItemContainer';
import './Style/LoadPromptStyle.css';

const LoadPrompt = ()=>{
    const context = useContext(AppContext);
    if (!context) throw Error("context not loaded");
    const [selectedTab,setSelectedTab] = useState('');
    return (
        <div className="loadPrompt bgCol5">
            <SavedItemContainer setState={setSelectedTab}/>
            <h5>Load tab</h5>
            <button>Load in {selectedTab}</button>
        </div>
    )
}

export default LoadPrompt;