import { synthName } from "../../../../../Data/@types/types";
import DropDown from "../../../../Inputs/DropDown";

type props = {
    stateChange : React.Dispatch<React.SetStateAction<synthName>>,
    activeSynth : string,
    synthNames : string[],
    className : string
}
const SynthChangeDropDown = (props:props)=>{
    const dropDownSynthChange = (valueIn:string)=>{
        const targetValue = valueIn;
        let output : synthName  = "Synth";
        // This is quite messy lulz
        switch (targetValue){
            case "Duo" : output = "Duo"; break;
            case "Synth" : output = "Synth"; break;
            case "FMSynth" : output = "FMSynth"; break;
            case "AMSynth" : output = "AMSynth"; break;
            case "MembraneSynth" : output = "MembraneSynth"; break;
            case "MetalSynth" : output = "MetalSynth"; break;
            case "MonoSynth" :  output = "MonoSynth"; break;
            case "PluckSynth" : output = "PluckSynth"; break;
            case "Bass1" : output = "Bass1"; break;
            case "Bass2" : output = "Bass2"; break;
            case "Guitar1" : output = "Guitar1"; break;
            case "AcousticGuitar1" : output = "AcousticGuitar1"; break;
            case "Piano1"   : output = "Piano1"; break;
            case "Banjo1"   : output = "Banjo1"; break;
            case "Woah"    : output = "Woah"; break;
            case "Flute1"   : output = "Flute1"; break;
            default : console.log(targetValue, " not recognised");
        }        
        props.stateChange(output);
    }
    return (
        <DropDown className={props.className} selectedOption={props.activeSynth} options={props.synthNames} onChangeFunc={dropDownSynthChange}/>

    )
}
export default SynthChangeDropDown;