import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import LoopIcon from '@mui/icons-material/Loop';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import './Styles/BtnIcons.css';
type props = {
    onClick : any, // couldn't get multiple functions to work
    icon : 'play' | 'cancel' | 'save' | 'stop' | 'loop' | 'add' | 'remove' | 'pause';
    activeIcon : null;
}
const BtnIcon = (props:props)=>{
    let Icon;
    switch (props.icon){
        case 'play': Icon = <PlayCircleIcon/>; break;
        case 'cancel': Icon = <CancelIcon/>; break;
        case 'save': Icon = <SaveIcon/>; break;
        case 'stop': Icon = <StopCircleIcon/>; break;
        case 'loop': Icon = <LoopIcon/>; break;
        case 'add':  Icon = <AddCircleOutlineIcon/>; break;
        case 'remove':Icon = <RemoveCircleOutlineIcon/>; break;
        case 'pause':Icon = <PauseCircleOutlineIcon/>; break;
    }
    return(
        <div onClick={props.onClick} id="BtnIcon">
            {Icon}   
        </div>
    )
}
BtnIcon.defaultProps = {
    onClick : ()=>{console.log("no function has been set")},
    activeIcon : null
}
export default BtnIcon;