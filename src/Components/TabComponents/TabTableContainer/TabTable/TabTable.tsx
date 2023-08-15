import { FormEvent, useContext, useEffect, useRef, useState, useReducer } from "react";
import {TabColumnCell, TabColumnHeader} from "./TabColumn/TabColumn";
import { AppContext, TabDefault } from "../../../../Data/AppContent";
import {AppContextType, instrumentName, noteLengthDisplays, noteLengths, note, tabType, synthName} from '../../../../Data/@types/types'
import TabItem from "./TabColumn/TabItem/TabItem";
import DropDown from "../../../Inputs/DropDown";
import { Instruments } from "../../../../Data/Music/Instruments";
import './TabTableStyle/TabTable.css';
import { playNote } from "../../../../Data/Tone/Tone";
import { conversions, getShortestNote } from "../../../../Data/StaticFunctions";
import SynthChangeDropDown from "./Dropdowns/SynthChangeDropDown";
import Synths from "../../../../Data/Tone/Instruments/Synths/Synths";
import BtnIcon from "../../../Icons/Buttons/BtnIcon";
import './TabTableStyle/TabTable.css';
interface TabTableProps {
    tab : tabType;
}
type playing = "stopped" | "playing" | "stopping";


const TabTable = (props:TabTableProps)=>{
    const firstUpdate = useRef(true);

    const {change,index,instrumentName,tab} = props.tab;
    const {stringNames} = Instruments.getSingle.all(instrumentName);


    const [playing,setPlaying] = useState<playing>("stopped");
    const [repeat,setRepeat] = useState<boolean>(false);
    const playingStateChange = ()=>{
        let stateOut : playing = "playing";
        switch(playing){
            case "stopped": stateOut = "playing"; break;
            case "playing": stateOut = "stopping";break;
            case "stopping":stateOut = "stopped";break;
        } 
        setPlaying(stateOut);
    }
    const changeNote = useRef<boolean>(false);
    const [currentNote,setCurrentNote] = useState(-1);

    const [title,setTitle] = useState(props.tab.title);
    const [playOctave,setPlayOctave] = useState(1);
    const [tempo,setTempo] = useState(props.tab.tempo);
    const [noteLengthDisplay,setNoteLengthDisplay] =useState<noteLengthDisplays>("simplified");
    const [synth,setSynth] = useState<synthName>("Synth");
    const synthNames = Synths.getAllNames();


    const context = useContext(AppContext);
    if (!context){
        throw new Error(
            'This cant be used here, firgure that one out loser'
        )
    };
    const removeNoteBtnFunc = ()=>{
        context.changeTabs.singleNote.remove(index)
    }
    const addNoteBtnFunc = ()=>{
        const newValue:note = {
            note:'0',
            length:shortestNoteLength
        }
        context.changeTabs.singleNote.add(index,newValue);
    }
    const closeBtnFunc = ()=>{
        context.changeTabs.remove(index);
    }

    // All for playing the tab
    const playBtnFunc = ()=>{
        playingStateChange();
    }
    const isHighlight = (mapIndex:number):boolean=>{
        let out = false;
        if (mapIndex === currentNote) out = true;
        return out;
    }
    useEffect(()=>{
        if (firstUpdate.current === false){
            switch(playing){
                case "stopped": changeNote.current = false; break;
                case "playing": changeNote.current = true; nextNote(); break;
                case "stopping": changeNote.current = false; setPlaying("stopped"); break;
            }
        }
    },[playing]);

    useEffect(()=>{
        if (firstUpdate.current === false){
            if (currentNote != -1 && playing === "playing"){
                playNote(tab[currentNote],playOctave,tempo,synth).then(()=>{
                    nextNote();
                });
            } else {
                setPlaying("stopped");
            }
        }
    },[currentNote])
    const nextNote = ()=>{
        if (changeNote.current === true){
            // currentNote < tab.length-1 ?  setCurrentNote(currentNote +1) : setCurrentNote(-1);
            if (currentNote < tab.length-1) setCurrentNote(currentNote + 1); else {
                repeat ? setCurrentNote(0) : setCurrentNote(-1);
            }
        }
    }

    const textOnExit = (titleIn:string)=>{
        context.changeTabs.changeTitle(index,titleIn);
    }
    const changeTempo = (tempoIn:number)=>{
        context.changeTabs.changeTempo(index,tempoIn);
    }

    // Check for first render
    useEffect(()=>{
        firstUpdate.current = false;
    },[])
    const lengths :noteLengths[] = [];
    tab.forEach(item=>lengths.push(item.length))
    const shortestNoteLength = noteLengthDisplay === "simplified" ? getShortestNote(lengths).length : "32n";
    const body = tab.map((line,mapIndex)=>{
        return <>
            <TabColumnCell 
                shortestNoteLength={shortestNoteLength}
                showNoteLengths={noteLengthDisplay}
                noteLength={line.length} highlight={isHighlight(mapIndex)} 
                noteIndex={mapIndex} change={change} key={mapIndex} tabIndex={index} 
                instrument={instrumentName} line={line.note}/>
        </>
    })
    const dropDownInstrumentChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        const targetValue = e.target.value;
        let output : instrumentName = 'bass';
        switch (targetValue) {
            case "guitar" : output = 'guitar';
        }
        context.changeTabs.instrument(index,output)
    }
    const dropDownLengthChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        const targetValue = e.target.value;
        let output : noteLengthDisplays = 'compressed';
        switch (targetValue) {
            case "simplified" : output = 'simplified'; break;
            case "simplified raw" : output = "simplified raw"; break;
        }
        setNoteLengthDisplay(output);
        // context.changeTabs.instrument(index,output)
    }
    return (
        <div id="tabTable" className="backgroundColor2">
            <div className="topSection row">
                <input className="textInput" typeof="text" value={title} onChange={(e)=>setTitle(e.target.value)} onBlur={(e)=>textOnExit(e.target.value)}/>
                <div className="topIcons iconDiv">
                    <BtnIcon icon="save"/>
                    <BtnIcon icon="cancel" onClick={closeBtnFunc}/>
                </div>
            </div>
            <div className="midSection row">
                <span className="inputContainer text">Octave :  <input className="textInput text" typeof="number" value={playOctave} onChange={(e)=>setPlayOctave(parseInt(e.target.value))}/></span>
                <span className="inputContainer text">BPM : <input className="textInput text" typeof="number" value={tempo}onChange={(e)=>setTempo(parseInt(e.target.value))}onBlur={(e)=>changeTempo(parseInt(e.target.value))}/></span>
                <div className="midIcons">
                    <div className="midLeftIcons iconDiv">
                        <BtnIcon onClick={playBtnFunc} icon="play"/>
                        <BtnIcon icon="stop"/>
                        <BtnIcon onClick={()=>{setRepeat(!repeat)}} icon="loop"/>
                    </div>
                    <div className="midRightIcons iconDiv">
                        <BtnIcon icon="remove"/>
                        <BtnIcon icon="add"/>
                    </div>
                </div>
            </div>
            <div className="bottomSection row">
                <div className="bottomLeftSection">
                    <SynthChangeDropDown stateChange={setSynth} activeSynth={synth} synthNames={synthNames}/>

                    <DropDown defaultOption={noteLengthDisplay} options={['compressed','simplified','simplified raw']} onChangeFunc={dropDownLengthChange}/>
                    <DropDown defaultOption={instrumentName} options={['bass','guitar']} onChangeFunc={dropDownInstrumentChange}/>
                </div>
                <div className="bottomRightSection">
                    <table>
                        <tbody>
                            <TabColumnHeader data={stringNames}/>
                            {body}
                        </tbody>
                    </table>
                </div>
            </div>
           
        </div>
    )
}
export default TabTable;