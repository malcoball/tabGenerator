import { useEffect, useMemo, useState } from "react";
import DeleteData from "../../../Data/SaveLoad/DeleteData";
import LoadData from "../../../Data/SaveLoad/LoadData";
import { keyMethods } from "../../../Data/StaticFunctions";
import BtnIcon from "../../Icons/Buttons/BtnIcon";
import './Style/SaveItemContainerStyle.css';

const SavedItem = (props:{value:string,setState:Function,change:Function,index:number,dataType:'tab'|'effect'})=>{
    const singleColors = 'col9 col5H'
    const backgroundClass = props.index %  2 === 0 ? 'bgCol2' : 'bgCol3';
    const containerClass = `${backgroundClass} savedItem`;
    const singleClass = `value clickable ${singleColors}`;
    const value = keyMethods.fileKey.parse(props.value);
    const onClick = ()=>{
        props.setState(value);
    }
    const deleteItem = (type:'tab'|'effect')=>{
        const targetKey = keyMethods.fileKey.create(value,type);
        console.log("targetKey : ",targetKey)
        DeleteData.localStorage.tab.byKey(targetKey);
        console.log("eh yo");
        props.change();
        // DeleteData.localStorage.tab.byTitle(props.value);
        // console.log("value : ",props.value);
        // console.log("delete pls");
    }
    return (
        <div  className={containerClass}><span onClick={onClick} className={singleClass}>{value} </span><BtnIcon onClick={()=>{deleteItem(props.dataType)}} icon="remove"/></div>
    )
}
const SavedItemContainer = (props:{className:string,setState:Function,saves:string[]|null,dataType:'tab' | 'effect'})=>{
    // const saves = props.saves === null? LoadData.localStorage.tab.getAll() : props.saves;
    let saves:any[] = [];
    if (props.saves === null) {
        saves = props.dataType === 'tab' ? LoadData.localStorage.tab.getAll() : LoadData.localStorage.effect.getAll();
    } else {
        saves = props.saves;
    }
    const [change,setChange] = useState(true);
    const onChange = ()=>{
        setChange(!change);
    }
    const Items = useMemo(()=>{
        return saves.map((item,index)=><SavedItem dataType={props.dataType} change={onChange} index={index} value={item} setState={props.setState}/>)
    },[change,props.saves])
    return (
        <section className={`saveItemContainer bgCol1 font1 ${props.className}`}>
            <h4>{props.dataType} saved data</h4>
            {Items}
        </section>
    )
}
SavedItemContainer.defaultProps = {
    className : "",
    saves : null
}
export default SavedItemContainer;