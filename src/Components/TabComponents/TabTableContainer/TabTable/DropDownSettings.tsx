import SynthChangeDropDown from "./Dropdowns/SynthChangeDropDown";
import DropDown from "../../../Inputs/DropDown";
import { instrumentName, noteLengthDisplays, synthName } from "../../../../Data/@types/types";
import './TabTableStyle/DropDownSettingsStyle.css';
import BtnIcon, { iconTypes } from "../../../Icons/Buttons/BtnIcon";
import { useContext } from "react";
import { AppContext } from "../../../../Data/AppContent";
import { effectIcons } from "./DropDownExtras/DropDownSettingsEffect";

type props = {
    setSynth : React.Dispatch<React.SetStateAction<synthName>>, synth: synthName, synthNames : string[],
    playOctave : number, setPlayOctave : React.Dispatch<React.SetStateAction<number>>,
    tempo: number, setTempo:(value: React.SetStateAction<number>) => void,changeTempo:(tempoIn:number)=>void,
    noteLengthDisplay : noteLengthDisplays,dropDownLengthChange:(valueIn:string)=>void,
    instrumentName : instrumentName,dropDownInstrumentChange:(valueIn:string)=>void,
    effectName : string,dropDownEffectChange:(valueIn:string)=>void
    closeMenu : ()=>void
}
const DropDownSettings = (props:props)=>{
    const {setSynth, synth, synthNames, playOctave, setPlayOctave, tempo,
    dropDownLengthChange,noteLengthDisplay,dropDownInstrumentChange,instrumentName,
    setTempo,changeTempo,closeMenu,effectName,dropDownEffectChange} = props;

    const context = useContext(AppContext);
    if (!context){
        throw new Error(
            'This cant be used here, firgure that one out loser'
        )
    };
    const effectNames = context.getEffects.all.title();
    const effectIconsCont: iconTypes[][] = effectIcons(effectNames);

    
    const backgroundColor1 = "bgCol5 bgCol2H";


    
    return <div className="dropDownSettings bgCol3">
        <div className="dropDownTitle"><span className="text">Tab Settings </span><BtnIcon icon="remove" onClick={closeMenu}/></div>
        <SynthChangeDropDown className={`dropDownContainer ${backgroundColor1}`} stateChange={setSynth} activeSynth={synth} synthNames={synthNames}/>
        <div className={`inputContainer dropDownContainer text ${backgroundColor1}`}>
            <span>Octave :  </span>
            <input className={`textInput text ${backgroundColor1}`} typeof="number" value={playOctave} onChange={(e)=>setPlayOctave(parseInt(e.target.value))}/>
        </div>
        <div className={`inputContainer dropDownContainer text ${backgroundColor1}`}>
            <span>BPM : </span>
            <input min="1" max="240" className={`textInput text ${backgroundColor1}`} typeof="number" value={tempo}onChange={(e)=>setTempo(parseInt(e.target.value))}onBlur={(e)=>changeTempo(parseInt(e.target.value))}/>
        </div>
        <DropDown type='.not' className={`dropDownContainer ${backgroundColor1}`} selectedOption={noteLengthDisplay} options={['compressed','simplified','simplified raw']} onChangeFunc={dropDownLengthChange}/>
        <DropDown type='.ins' className={`dropDownContainer ${backgroundColor1}`} selectedOption={instrumentName} options={['bass','guitar']} onChangeFunc={dropDownInstrumentChange}/>
        <DropDown type='.eff' className={`dropDownContainer ${backgroundColor1}`} selectedOption={effectName} options={effectNames} onChangeFunc={dropDownEffectChange} icon={effectIconsCont}/>

    </div>
}
export default DropDownSettings;