import { useState } from "react"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './Styles/DropDownStyle.css';
import  { iconTypes } from "../Icons/Buttons/BtnIcon";
import { EffectButtons } from "./DropDownButtons";




type DropDownItemProps = {
    className : string,
    onClick : (valueOut:string) =>void,
    value : string,
    icon : iconTypes[] | null,
    type : '.syn' | '.not' | '.ins' | '.eff',

}
const DropDownItem = (props:DropDownItemProps)=>{
    const {className,value,icon,type} = props;
    const onClick = ()=>{
        props.onClick(value)
    } 

    return(
        <div className={`dropDownItemContainer ${className}`}>
            <span id="dropDownItem" onClick={onClick} >{value}</span>
            {(icon!== null && type==='.eff') && <EffectButtons effectTitle={value} icons={icon}/>}
        </div>
    )
}

type DropDownProps = {
    type : '.syn' | '.not' | '.ins' | '.eff'
    onChangeFunc : (valueOut:string)=>void,
    options : string[],
    icon : iconTypes[][] | null,
    selectedOption : string,
    className : string,
}
const DropDown = (props:DropDownProps)=>{
    const toggleMenu = ()=>{
        setShowMenu(!showMenu);
    }
    const menuItemClick = (valueOut:string)=>{
        toggleMenu()
        props.onChangeFunc(valueOut)
    }
    const itemClass1 = "bgCol4 bgCol5H";
    const itemClass2 = "bgCol3 bgCol5H";
    const Options = props.options.map((item,index) => 
    <DropDownItem type={props.type} className={index % 2 === 0 ? itemClass1 : itemClass2} onClick={menuItemClick} value={item} icon={props.icon !== null ? props.icon[index] : null}/>)
    const [showMenu,setShowMenu] = useState(false);
    return (
        <div id="dropDownContainer" className={`${showMenu?"bgCol2":"bgCol3"} menuOpen${showMenu} ${props.className}`}>
            <div className="dataDisplayContainer"  onClick={toggleMenu}>
                <span id="dataDisplay">{props.selectedOption} <ArrowDropDownIcon className="downArrow"/></span>
            </div>
            {showMenu? 
                <div id="dropDownList" className="bgCol4">
                    {Options}
                </div>
                :<></>}
        </div>
    )
}
DropDown.defaultProps = {
    icon : null
}

export default DropDown;