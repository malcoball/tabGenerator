import {useState, useContext, useRef, useEffect, useMemo} from 'react';
import LoadData from '../../../Data/SaveLoad/LoadData';
import { AppContext } from '../../../Data/AppContent';
import SaveData from '../../../Data/SaveLoad/SaveData';
import './Style/SavePromptStyle.css';
import SavedItemContainer from './SavedItemContainer';
import { keyMethods } from '../../../Data/StaticFunctions';

const SavePrompt = (props:{type:'tab'|'effect'})=>{
    const context = useContext(AppContext);
    if (!context) throw Error("context not loaded");
    const data = context.getPrompts.saveInfo.tabInfo;
    const saves = LoadData.localStorage.tab.getAll();
    const [saveName,setSaveName] = useState(data.title);
    const [saveExist,setsaveExist] = useState(false);
    
    const saveBtnClick = ()=>{
        if (saveExist){
            console.error('save already exists, I told you this');
        } else {
            saveData();
        }
    }
    const overBtnClick = ()=>{
        saveData();
    }
    const saveData = ()=>{
        data.title = saveName;
        SaveData.tabTo.localStorage(data,saveName);
        context.changePrompts.close.standard();
    }
    useEffect(()=>{
        const test = keyMethods.fileKey.create(saveName,'tab');
        let match = (saves.includes(test));
        setsaveExist(match);
    },[saveName])
    return (
        <div className="savePrompt bgCol2">
            <SavedItemContainer className='top' saves={saves} setState={setSaveName}/>
            <section className="bottom">
                <span>Save as : </span>
                <input type="text" value={saveName} onChange={(event)=>{setSaveName(event.target.value)}}/>
                {saveExist && <span>Name already exists</span>}
                <button onClick={saveBtnClick}>Save</button>
                <button onClick={overBtnClick}>Override</button>
            </section>
            
        </div>
    )
}

export default SavePrompt;