import {useState, useContext} from 'react';
import { AppContext } from '../../../Data/AppContent';
import SaveData from '../../../Data/SaveLoad/SaveData';

const SavePrompt = (props:{type:'tab'|'effect'})=>{
    const context = useContext(AppContext);
    if (!context) throw Error("context not loaded");
    const data = context.getPrompts.saveInfo.tabInfo;
    const btnClick = ()=>{
        SaveData.tabTo.localStorage(data,data.title);
    }
    // const [saveName,setSaveName] = useState('')
    return (
        <div className="savePrompt">
            <h5>title of save {data.title}</h5>
            {/* <input type="text" value={saveName} onChange={(event)=>{setSaveName(event.target.value)}}/> */}
            <button onClick={btnClick}>Save</button>
        </div>
    )
}

export default SavePrompt;