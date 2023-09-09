import { useEffect } from "react";
import { instrumentName, noteLengthDisplays, synthName } from "../../../../../Data/@types/types";
import BtnIcon from "../../../../Icons/Buttons/BtnIcon";
import DropDownSettings from "../DropDownSettings";

type props = {
    // Sorry if anyone else has to see this. Tried something new
    settings : {showSettings:boolean,setShowSettings:(value:React.SetStateAction<boolean>)=>void},
    synth : {synthName:synthName, setSynth:React.Dispatch<React.SetStateAction<synthName>>,synthNames:string[]},
    octave : {playOctave:number, setPlayOctave:React.Dispatch<React.SetStateAction<number>>},
    tempo : {tempoValue:number, setTempo:React.Dispatch<React.SetStateAction<number>>, changeTempo:(tempoIn: number) => void},
    instruments : {instrumentName:instrumentName,dropDownInstrumentChange: (valueIn: string) => void},
    notes : {noteLengthDisplay:noteLengthDisplays,dropDownLengthChange: (valueIn: string) => void,}
    effects : {effectName:string,dropDownEffectChange:(valueIn:string)=>void},
    noteFunctions : {addNote:()=>void,removeNote:()=>void},
    playControls : {playBtnFunc: () => void,stopBtnFunc:()=>void,setRepeat: (value: React.SetStateAction<boolean>) => void,
                        repeat: boolean, }
    playing : string
}

const MidSection = (props:props)=>{
    const {settings,synth,octave,tempo,instruments,effects,
        notes,noteFunctions,playControls,playing } = props;
    const {showSettings,setShowSettings} = settings;
    const {synthName,setSynth,synthNames} = synth;
    const {playOctave,setPlayOctave} = octave;
    const {tempoValue,setTempo,changeTempo} = tempo;
    const {instrumentName,dropDownInstrumentChange} = instruments;
    const {effectName,dropDownEffectChange} = effects;
    const {noteLengthDisplay,dropDownLengthChange} = notes;
    const {addNote,removeNote} = noteFunctions;
    const {playBtnFunc,stopBtnFunc,setRepeat,repeat} = playControls;

    const toggleMenu = (toggle = true)=>{
        const change = toggle ? !showSettings : false;
        setShowSettings(change);
    }

    return (
        <div className="midSection row">
                <div className="midLeftSection" onBlur={()=>{toggleMenu(false)}}>
                        <BtnIcon onClick={toggleMenu} icon="settings"/>
                        {showSettings && <div className="dropDownSettings">
                            <DropDownSettings closeMenu={()=>{setShowSettings(!showSettings)}}
                                setSynth={setSynth} synth={synthName} synthNames={synthNames} playOctave={playOctave} setPlayOctave={setPlayOctave}
                                tempo={tempoValue} setTempo={setTempo} changeTempo={changeTempo} noteLengthDisplay={noteLengthDisplay} dropDownLengthChange={dropDownLengthChange}
                                instrumentName={instrumentName} dropDownInstrumentChange={dropDownInstrumentChange} effectName={effectName} dropDownEffectChange={dropDownEffectChange}
                            />
                        </div>}
                </div>
                <div className="midMidSection">
                        <div className="midIcons">
                            <div className="midLeftIcons iconDiv">
                                <BtnIcon onClick={playBtnFunc} icon="play" altIcon="pause" active={playing === "playing"}/>
                                
                                <BtnIcon onClick={stopBtnFunc} icon="stop"/>
                                <BtnIcon onClick={()=>setRepeat(!repeat)} icon="loop" altIcon="switch" active={repeat}/>

                                {/* {repeat ? <BtnIcon onClick={()=>{setRepeat(!repeat)}} icon="loop"/> :
                                    <BtnIcon onClick={()=>{setRepeat(!repeat)}} icon="switch"/>} */}
                                
                            </div>
                        </div>
                </div>
                <div className="midRightSection">
                        <div className="midRightIcons iconDiv">
                            <BtnIcon icon="remove" onClick={removeNote}/>
                            <BtnIcon icon="add" onClick={addNote}/>
                        </div>
                </div>
            </div>
    )
}
export default MidSection;