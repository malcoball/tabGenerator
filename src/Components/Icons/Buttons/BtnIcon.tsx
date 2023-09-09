import {useState} from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import LoopIcon from '@mui/icons-material/Loop';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import SettingsInputCompositeIcon from '@mui/icons-material/SettingsInputComposite';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {GuitarHeadIcon} from './CustomBtns';

import './Styles/BtnIcons.css';
type iconTypes = 'play' | 'cancel' | 'save' | 'stop' | 'loop' | 'add' | 'remove' | 'pause' | 'settings'
| 'guitarHead' | 'switch' |'arrowDown' | "arrowBack" | "arrowFoward";
type props = {
    onClick : any, // couldn't get multiple functions to work
    icon : iconTypes;
    altIcon : iconTypes;
    className : string;
    active : boolean;
}
const getIcon = (iconIn:iconTypes|null)=>{
    if (iconIn === null) return null;
    switch (iconIn){
        case 'play': return <PlayCircleIcon/>;
        case 'cancel': return <CloseIcon/>;
        case 'save': return <SaveIcon/>;
        case 'stop': return <StopCircleIcon/>;
        case 'loop': return <LoopIcon/>;
        case 'add':  return <AddCircleOutlineIcon/>; 
        case 'remove':return <RemoveCircleOutlineIcon/>; 
        case 'pause':return <PauseCircleOutlineIcon/>; 
        case 'settings': return<SettingsInputCompositeIcon/>;
        case 'guitarHead': return<GuitarHeadIcon/>
        case 'switch' : return <SwapHorizIcon/>
        case 'arrowDown': return <ArrowDropDownIcon/>
        case 'arrowBack': return <ArrowBackIcon/>
        case 'arrowFoward':return<ArrowForwardIcon/>
    }
}
const BtnIcon = (props:props)=>{
    const Icon = getIcon(props.icon);
    const IconAlt = props.altIcon !== null ? getIcon(props.altIcon) : Icon;
    const className = `${props.className} ${props.active ? "active" : ""} ${props.icon}Icon`;
    return(
        <div onClick={()=>{props.onClick();}} id="BtnIcon" className={className}>
            {props.active ? IconAlt : Icon}
        </div>
    )
}
BtnIcon.defaultProps = {
    onClick : ()=>{console.log("no function has been set")},
    altIcon : null,
    className : '',
    active : false
}
export default BtnIcon;