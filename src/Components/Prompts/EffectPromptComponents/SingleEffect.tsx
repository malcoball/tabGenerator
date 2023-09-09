import { Slider } from "@mui/material"
import './SingleEffectStyle.css';
import { effectName } from "../../../Data/@types/types";
import {useState} from 'react';
import DataSection from "./DataSection";
import EffectSettings, { singleSettings } from "../../../Data/Tone/Effects/EffectSettings";

type props = {
    title: effectName,
    value : number[]
    // value : {value:{name:string,amount:number,min: number, max: number}[]},
    // active:boolean,
    changeValue : (target: string, value: number, index:number) => void,
    changeActive: (target:string, active:boolean) => void,
}

const SingleEffect = (props:props)=>{
    const {title,value,changeActive} = props;
    const settings = EffectSettings[title];
    const [active,setActive] = useState(false);
    const activeClass = active ? "On" : "Off";
    const changeValue = (event:Event, newValue : number | number[],valueTarget:number)=>{
        // setTest(newValue as number);
        if (active === true){
            props.changeValue(title,newValue as number,valueTarget);
        }
    }
    const buttonClick = ()=>{
        setActive(!active);
        changeActive(title,!active);
    }
    return (
        <div className={`effectContainer effect${activeClass}`}>
            <div className="content">
                <div className="behindPowerLight"></div>
                <div className="powerLight"></div>
                <DataSection title={title} value={value} active={active} changeValue={changeValue} settings={settings}/>
                <div className="toggleButton">
                    <div className="underButton">
                        <button onClick={buttonClick}></button>
                    </div>
                </div>
            </div>
            <div className="textureOverlay"></div>
        </div>
    )
}
SingleEffect.defaultProps = {
    title : "title please",
    min : 0,
}
export default SingleEffect;