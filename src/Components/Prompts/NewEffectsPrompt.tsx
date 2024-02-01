import { useState, useContext, useRef, useEffect } from "react";
import SingleEffect from "./EffectPromptComponents/SingleEffect";
import './NewEffectsStyle/NewEffectPromptStyle.css';
import { effectName, effectType, note } from "../../Data/@types/types";
import { AppContext } from "../../Data/AppContent";
import SavePrompt from "./SaveLoadPrompt/SavePrompt";
import { playNote } from "../../Data/Tone/Tone";
import Synths from "../../Data/Tone/Instruments/Synths/Synths";
import PromptBehind from "./PromptBehind";

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
    const buttonClass = title.length > 0 ?  'buttonShow bgCol1 bgCol2H' : 
                                            'buttonHide bgCol1';
    const [showSavePrompt,setShowSavePrompt] = useState(false);
    const [values,setValues] = useState<valueTypes>({
        distortion : data.distortion,
        reverb : data.reverb,
        tremolo : data.tremolo,
        eq : data.eq
    })
    useEffect(()=>{
        synthRefresh();
    },[values]);
    const synth = useRef(Synths.getSynth('Bass1').synth);


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
    
    const handlePlayBtn = ()=>{
        attachEffect();
        const note:note = {note:'15',length:'8n'}
        playNote(note,2,120,synth.current);
    }
    const synthRefresh = ()=>{
        synth.current.disconnect();
        synth.current = Synths.getSynth('Bass1').synth.toDestination();
    }
    const attachEffect = ()=>{
        synthRefresh();
        // const active = values.distortion.active;
        let active = false;
        const value:any = {};
        for (let i in values){
            const obj = values[i as keyof typeof values];
            // value[i] = obj.active === true ? obj.value : null; 
            if (obj.active === true){
                value[i] = obj.value; active = true;
            } else {
                value[i] = null;
            }
        }
        if (active === true){
            console.log("effect active");
            const effect = context.parseEffects.toTone(value);
            if (effect.length > 0){
                effect.forEach(item => {
                    if (item !== null) synth.current.connect(item);
                    console.log("item : ",item);
                });
            }
        }
    }



    const buttonClick = (button:'tablePush'|'tableReplace'|'save')=>{
        if (title.length > 0){
            switch(button){
                case "tablePush": handleTablePushBtn(); break;
                case "tableReplace":handleTableReplaceBtn(); break;
                case "save": handleSaveBtn(); break;
            }
        }
    }
    return (
        <div className="promptContainer"> 
            <div className="effectsPrompt bgCol6">
                <section className="leftSection effectSection">
                    <SingleEffect changeValue={changeValue} changeActive={changeActive} title="distortion" value={{gain:values.distortion.value,activeInp:values.distortion.active}}/>
                    <SingleEffect changeValue={changeValue} changeActive={changeActive} title="eq"   value={{gain:values.eq.value,activeInp:values.eq.active}}/>
                </section>
                <section className="midSection bgCol6">
                    <div className="buttonContainer">
                        <button onClick={handlePlayBtn}>Preview effect</button>
                    </div>
                    <div className="divider"></div>
                    <input placeholder="Enter title" type="text" value={title} onChange={(event)=>{setTitle(event.target.value)}}/>
                    <div className="divider"></div>
                    <div className="buttonContainer">
                        {type === 'new' ? 
                            <button className={buttonClass} onClick={()=>{buttonClick('tablePush')}}>Add Effect to tables</button> : 
                            <button className={buttonClass} onClick={()=>{buttonClick('tableReplace')}}>Replace Effect on tables</button>}

                        <button className={buttonClass} onClick={()=>{buttonClick('save')}}>Save Effect</button>
                    </div>
                </section>
                <section className="rightSection effectSection">
                    <SingleEffect changeValue={changeValue} changeActive={changeActive} title="reverb"     value={{gain:values.reverb.value,activeInp:values.reverb.active}}/>
                    <SingleEffect changeValue={changeValue} changeActive={changeActive} title="tremolo"    value={{gain:values.tremolo.value,activeInp:values.tremolo.active}}/>
                </section>
                {showSavePrompt && <SavePrompt type='effect'/>}
            </div>
            <PromptBehind closeFunc={context.changePrompts.close.standard}/>
        </div>   
    )
}

export default NewEffectsPrompt;