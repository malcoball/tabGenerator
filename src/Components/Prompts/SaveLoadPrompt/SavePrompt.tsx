import {useState, useContext} from 'react';
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
    const [saveName,setSaveName] = useState(data.title);
    const btnClick = ()=>{
        let saveExist = false;
        const saves = LoadData.localStorage.tab.getAll();
        saves.forEach(save => {
            const parse = keyMethods.fileKey.parse(save);
            if (parse === saveName){
                saveExist = true;
            }
        })
        if (saveExist !== false){
            data.title = saveName;
            SaveData.tabTo.localStorage(data,saveName);
            context.changePrompts.close.standard();
            console.log("push ye")
        } else {
            console.log(`${data.title} already exists`)
        }
        // data.title = saveName;
        // SaveData.tabTo.localStorage(data,saveName);
        // context.changePrompts.close.standard();
    }
    return (
        <div className="savePrompt bgCol2">
            <SavedItemContainer className='top' setState={setSaveName}/>
            <section className="bottom">
                <span>Save as : </span>
                <input type="text" value={saveName} onChange={(event)=>{setSaveName(event.target.value)}}/>
                <button onClick={btnClick}>Save</button>
            </section>
            
        </div>
    )
}

export default SavePrompt;