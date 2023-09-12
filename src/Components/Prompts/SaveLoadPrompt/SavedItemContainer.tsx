import { useEffect, useMemo, useState } from "react";
import DeleteData from "../../../Data/SaveLoad/DeleteData";
import LoadData from "../../../Data/SaveLoad/LoadData";
import { keyMethods } from "../../../Data/StaticFunctions";
import BtnIcon from "../../Icons/Buttons/BtnIcon";
import './Style/SaveItemContainerStyle.css';

const SavedItem = (props:{value:string,setState:Function,change:Function,index:number})=>{
    const singleColors = 'col9 col5H'
    const backgroundClass = props.index %  2 === 0 ? 'bgCol2' : 'bgCol3';
    const containerClass = `${backgroundClass} savedItem`;
    const singleClass = `value clickable ${singleColors}`;
    const value = keyMethods.fileKey.parse(props.value);
    const onClick = ()=>{
        props.setState(value);
    }
    const deleteItem = ()=>{
        const targetKey = keyMethods.fileKey.create(value,'tab');
        console.log("targetKey : ",targetKey)
        DeleteData.localStorage.tab.byKey(targetKey);
        console.log("eh yo");
        props.change();
        // DeleteData.localStorage.tab.byTitle(props.value);
        // console.log("value : ",props.value);
        // console.log("delete pls");
    }
    return (
        <div  className={containerClass}><span onClick={onClick} className={singleClass}>{value} </span><BtnIcon onClick={deleteItem} icon="remove"/></div>
    )
}
const SavedItemContainer = (props:{className:string,setState:Function,saves:string[]|null})=>{
    const saves = props.saves === null? LoadData.localStorage.tab.getAll() : props.saves;
    const [change,setChange] = useState(true);
    const onChange = ()=>{
        setChange(!change);
    }
    // const Items = saves.map((item,index)=><SavedItem index={index} value={item} setState={props.setState}/>)
    const Items = useMemo(()=>{
        return saves.map((item,index)=><SavedItem change={onChange} index={index} value={item} setState={props.setState}/>)
    },[change])
    return (
        <section className={`saveItemContainer bgCol1 font1 ${props.className}`}>
            <h4>Type of what data's being handled</h4>
            {Items}
        </section>
    )
}
SavedItemContainer.defaultProps = {
    className : "",
    saves : null
}
export default SavedItemContainer;