import {useState, useContext, useEffect} from 'react';
import LoadData from '../../../Data/SaveLoad/LoadData';
import { AppContext } from '../../../Data/AppContent';
import SaveData from '../../../Data/SaveLoad/SaveData';
import './Style/SavePromptStyle.css';
import SavedItemContainer from './SavedItemContainer';
import { keyMethods } from '../../../Data/StaticFunctions';

const SavePrompt = (props:{type:'tab'|'effect'})=>{
    const {type} = props;
    const context = useContext(AppContext);
    if (!context) throw Error("context not loaded");
    const data:any = type === 'tab' ? context.getPrompts.saveInfo.tabInfo : context.getPrompts.saveInfo.effectInfo;
    const title = type === 'tab' ? data.title : data.data.title;
    console.log("data",data);
    const saves = LoadData.localStorage.tab.getAll();
    const [saveName,setSaveName] = useState(title);
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
    const getActiveClass = (active:boolean)=>{
        return active ? 'activeBtn' : 'disabledBtn';
    }
    const saveData = ()=>{
        data.title = saveName;
        
        props.type === 'tab' ? SaveData.tabTo.localStorage(data,saveName) : SaveData.effectTo.localStorage(data,saveName)
        context.changePrompts.close.standard();
    }
    useEffect(()=>{
        const test = keyMethods.fileKey.create(saveName,'tab');
        let match = (saves.includes(test));
        setsaveExist(match);
    },[saveName])
    return (
        <div className="savePrompt bgCol6">
            <SavedItemContainer dataType={props.type} className='top' setState={setSaveName}/>
            <section className="bottom">
                <span className='col2'>Save as : </span>
                <input type="text" value={saveName} onChange={(event)=>{setSaveName(event.target.value)}}/>
                {saveExist && <span>Override existing save ?</span>}
                <div className="saveBtnContainer">
                    <button className={"saveBtn "+getActiveClass(!saveExist)} onClick={saveBtnClick}>Save</button>
                    <button className={"saveBtn "+getActiveClass(saveExist)} onClick={overBtnClick}>Yes</button>
                </div>
            </section>
            
        </div>
    )
}

export default SavePrompt;