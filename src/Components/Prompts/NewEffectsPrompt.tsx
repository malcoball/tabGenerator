import { useState, useContext } from "react";
import SingleEffect from "./EffectPromptComponents/SingleEffect";
import './NewEffectsStyle/NewEffectPromptStyle.css';
import EffectSettings from "../../Data/Tone/Effects/EffectSettings";
import { effectName, effectType } from "../../Data/@types/types";
import { AppContext } from "../../Data/AppContent";

type dataType = {
    value : number []
    active:boolean,
    type : effectName
}
type valueTypes = {
    distortion : dataType, reverb : dataType, eq : dataType, tremolo : dataType
}
const Settings = EffectSettings; // Just to save a bit of timing, might be worth seeing if this is better in or out of the component
const NewEffectsPrompt = ()=>{
    const [title,setTitle] = useState('');
    const [values,setValues] = useState<valueTypes>({
        distortion:{
            type : 'distortion',
            active : false,
            value:[0],
        },
        reverb:{
            type:'reverb',
            active : false,
            value: [0,0],
            
        },
        eq:{
            type:'eq',
            active : false,
            value: [0,0,0],
        },
        tremolo:{
            type:'tremolo',
            active : false,
            value : [0,0],
        },
    })
    const context = useContext(AppContext);
    if (!context){throw new Error('This cant be used here lulz');}
    const changeValue = (target:string,value:number,index:number)=>{
        const valuesOut = {...values};
        switch (target){
            case "distortion" : valuesOut.distortion.value[index] = value; break;
            case "reverb" : valuesOut.reverb.value[index] = value; break;
            case "eq" : valuesOut.eq.value[index] = value; break;
            case "tremolo" : valuesOut.tremolo.value[index] = value; break;
        }
        setValues(valuesOut);
    }
    const changeActive = (target:string,active:boolean)=>{
        const valuesOut = {...values};
        switch (target){
            case "distortion" : valuesOut.distortion.active = active; break;
            case "reverb" : valuesOut.reverb.active = active; break;
            case "eq" : valuesOut.eq.active = active; break;
            case "tremolo" : valuesOut.tremolo.active = active; break;
        }
        setValues(valuesOut);
    }
    const handleButtonClick = ()=>{
        const newEffect:effectType = {
            title: title,
            distortion : values.distortion,
            reverb : values.reverb,
            eq : values.eq,
            tremolo : values.tremolo,
            index : -1 // will go overwritten by the out function
        }

        context.changeEffects.add(newEffect);
        context.changePrompts.close.standard();
    }
    return (
        <div className="effectsPrompt bgCol6">
            <section className="leftSection">
                <SingleEffect changeValue={changeValue} changeActive={changeActive} title="distortion" value={values.distortion.value}/>
                <SingleEffect changeValue={changeValue} changeActive={changeActive} title="eq"   value={values.eq.value}/>
            </section>
            <section className="midSection">
                <input placeholder="Title" type="text" value={title} onChange={(event)=>{setTitle(event.target.value)}}/>
                <button onClick={handleButtonClick}>Create Effect</button>
            </section>
            <section className="rightSection">
                <SingleEffect changeValue={changeValue} changeActive={changeActive} title="reverb"     value={values.reverb.value}/>
                <SingleEffect changeValue={changeValue} changeActive={changeActive} title="tremolo"    value={values.tremolo.value}/>
            </section>
            
        </div>
    )
}

export default NewEffectsPrompt;