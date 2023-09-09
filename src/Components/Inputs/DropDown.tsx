import { FormControl, InputLabel,Select,MenuItem, SelectChangeEvent } from "@mui/material"
import { FormEvent, useState, useEffect } from "react"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './Styles/DropDownStyle.css';
type DropDownProps = {
    onChangeFunc : (valueOut:string)=>void,
    options : string[],
    selectedOption : string,
    className : string
}

const DropDown = (props:DropDownProps)=>{
    const toggleMenu = ()=>{
        setShowMenu(!showMenu);
    }
    const closeMenu = ()=>{
        if (showMenu === true) setShowMenu(false);
    }
    const menuItemClick = (valueOut:string)=>{
        toggleMenu()
        props.onChangeFunc(valueOut)
    }
    const itemClass1 = "bgCol4 bgCol5H";
    const itemClass2 = "bgCol3 bgCol5H";
    const Options = props.options.map((item,index) => <span className={index % 2 === 0 ? itemClass1 : itemClass2} id="dropDownItem" onClick={()=>{menuItemClick(item)}} key={index} >{item}</span>)
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

export default DropDown;