import {useState, useContext} from 'react';
import { AppContext } from '../../../Data/AppContent';
import LoadData from '../../../Data/SaveLoad/LoadData';

const LoadPrompt = ()=>{
    const context = useContext(AppContext);
    if (!context) throw Error("context not loaded");
    const loadData = LoadData.localStorage.tab.getAll();
    const [selectedTab,setSelectedTab] = useState('');
    const options = loadData.map(item=><span onClick={()=>{setSelectedTab(item)}}>{item}<br/></span>)
    const btnClick = ()=>{
        const data = LoadData.localStorage.tab.loadSingle(selectedTab);
        if (data !== null){
            context.changeTabs.add(data)
        }
        console.log(data);
        // context.changePrompts.close();
    }
    // const [saveName,setSaveName] = useState('')
    return (
        <div className="savePrompt">
            <h5>load data pls</h5>
            {options}
            <button onClick={btnClick}>Load in {selectedTab}</button>
        </div>
    )
}

export default LoadPrompt;