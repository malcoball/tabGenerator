import { useState, useContext, useEffect } from "react";
import SingleEffect from "./EffectPromptComponents/SingleEffect";
import './NewEffectsStyle/NewEffectPromptStyle.css';
import { effectName, effectType } from "../../Data/@types/types";
import { AppContext } from "../../Data/AppContent";
import SavePrompt from "./SaveLoadPrompt/SavePrompt";

type dataType = {
    value : number []
    active:boolean,
    type : effectName
}
type valueTypes = {
    distortion : dataType, reverb : dataType, eq : dataType, tremolo : dataType
}
const NewEffectsPrompt = ()=>{
    const context = useContext(AppContext);
    if (!context){throw new Error('This cant be used here lulz');}
    const info = context.getPrompts.saveInfo.effectInfo;
    const type = info.mode;
    const data = info.data;
    const [title,setTitle] = useState(data.title);
    const [showSavePrompt,setShowSavePrompt] = useState(false);
    const [values,setValues] = useState<valueTypes>({
        distortion : data.distortion,
        reverb : data.reverb,
        tremolo : data.tremolo,
        eq : data.eq
    })

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
    const createEffect = ()=>{
        const newEffect:effectType = {
            title: title,
            distortion : values.distortion,
            reverb : values.reverb,
            eq : values.eq,
            tremolo : values.tremolo,
            index : -1 // will go overwritten by the out function
        }
        return newEffect;
    }
    const handleTablePushBtn = ()=>{
        const newEffect = createEffect();
        context.changeEffects.add(newEffect);
        context.changePrompts.close.standard();
    }
    const handleTableReplaceBtn = ()=>{
        const newEffect = createEffect();
        context.changeEffects.replace(newEffect);
        // context.changeEffects.
        // context.changeEffects.add(newEffect);
        context.changePrompts.close.standard();
    }
    
    const handleSaveBtn = ()=>{
        if (!showSavePrompt){
            // Get or set the correct index
            const newEffect = createEffect();
            context.changePrompts.set.save.effect.byInput(newEffect);
        }
        setShowSavePrompt(!showSavePrompt);
    }
    return (
        <div className="effectsPrompt bgCol6">
            <section className="leftSection">
                <SingleEffect changeValue={changeValue} changeActive={changeActive} title="distortion" value={{gain:values.distortion.value,activeInp:values.distortion.active}}/>
                <SingleEffect changeValue={changeValue} changeActive={changeActive} title="eq"   value={{gain:values.eq.value,activeInp:values.eq.active}}/>
            </section>
            <section className="midSection">
                <input placeholder="Title" type="text" value={title} onChange={(event)=>{setTitle(event.target.value)}}/>
                <div className="divider"></div>
                <div className="buttonContainer">
                    {type === 'new' ? 
                        <button onClick={handleTablePushBtn}>Add Effect to tables</button> : 
                        <button onClick={handleTableReplaceBtn}>Replace Effect on tables</button>}
                    
                    <button onClick={handleSaveBtn}>Save Effect</button>
                </div>
            </section>
            <section className="rightSection">
                <SingleEffect changeValue={changeValue} changeActive={changeActive} title="reverb"     value={{gain:values.reverb.value,activeInp:values.reverb.active}}/>
                <SingleEffect changeValue={changeValue} changeActive={changeActive} title="tremolo"    value={{gain:values.tremolo.value,activeInp:values.tremolo.active}}/>
            </section>
            {showSavePrompt && <SavePrompt type='effect'/>}
        </div>
    )
}

export default NewEffectsPrompt;