import { useContext } from "react";
import { iconTypes } from "../Icons/Buttons/BtnIcon";
import BtnIcon from "../Icons/Buttons/BtnIcon";
import { AppContext } from "../../Data/AppContent";

export const EffectButtons = (props:{icons:iconTypes[],effectTitle:string})=>{
    const context = useContext(AppContext);
    if (!context){
        throw new Error(
            'This cant be used here, firgure that one out loser'
        )
    };
    const effect = context.getEffects.single.byTitle(props.effectTitle);
    const deleteFunc = ()=>{
        context.changeEffects.remove(effect.index);
    }
    const settingsFunc = ()=>{
        context.changePrompts.set.save.effect.byIndex(effect.index);
        context.changePrompts.set.effect('replace');
    }
    const onClick = (type:'settings'|'remove'|string)=>{
        
        return type !== 'settings' ? deleteFunc() : settingsFunc();
    }
    const Buttons = props.icons.map(item=><BtnIcon icon={item} onClick={()=>{onClick(item)}}/>)
    return (
        <div className="buttonContainer">
            {Buttons}
        </div>
    )
}