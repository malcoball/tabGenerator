import LoadData from "../../../Data/SaveLoad/LoadData";
import BtnIcon from "../../Icons/Buttons/BtnIcon";
import './Style/SaveItemContainerStyle.css';

const SavedItem = (props:{value:string,setState:Function,index:number})=>{
    const singleColors = 'col9 col5H'
    const backgroundClass = props.index %  2 === 0 ? 'bgCol2' : 'bgCol3';
    const containerClass = `${backgroundClass} savedItem`;
    const singleClass = `value clickable ${singleColors}`;
    const onClick = ()=>{
        props.setState(props.value);
    }
    const deleteItem = ()=>{
        console.log("delete pls");
    }
    return (
        <div onClick={onClick} className={containerClass}><span className={singleClass}>{props.value} </span><BtnIcon onClick={deleteItem} icon="remove"/></div>
    )
}
const SavedItemContainer = (props:{className:string,setState:Function})=>{
    const saves = LoadData.localStorage.tab.getAll();
    const Items = saves.map((item,index)=><SavedItem index={index} value={item} setState={props.setState}/>)
    return (
        <section className={`saveItemContainer bgCol1 font1 ${props.className}`}>
            <h4>Type of what data's being handled</h4>
            {Items}
        </section>
    )
}
SavedItemContainer.defaultProps = {
    className : ""
}
export default SavedItemContainer;