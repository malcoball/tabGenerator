import {useContext, useEffect, useRef, useState, useReducer } from "react";
import {TabColumnCell, TabColumnHeader} from "./TabColumn/TabColumn";
import { AppContext } from "../../../../Data/AppContent";
import {instrumentName, noteLengthDisplays, noteLengths, note, tabType, synthName} from '../../../../Data/@types/types'
import { Instruments } from "../../../../Data/Music/Instruments";
import './TabTableStyle/TabTable.css';
import {playNote} from "../../../../Data/Tone/Tone";
import {getShortestNote} from "../../../../Data/StaticFunctions";
import Synths from "../../../../Data/Tone/Instruments/Synths/Synths";
import BtnIcon from "../../../Icons/Buttons/BtnIcon";
import TimingDisplayIcon from "../../../Icons/Other/TimingDisplayIcon";
import MidSection from "./Sections/MidSection";
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

    const markerPosition = useRef(0);
    const setMarkerPosition = ()=>{
        const length = tab.length;
        const step = 100 / length;
        markerPosition.current = (currentNote+1) * step;
    }

    const [title,setTitle] = useState(props.tab.title);
    const [playOctave,setPlayOctave] = useState(1);
    const [tempo,setTempo] = useState(props.tab.tempo);
    const [noteLengthDisplay,setNoteLengthDisplay] =useState<noteLengthDisplays>("compressed");
    const [synth,setSynth] = useState<synthName>("Synth");
    const [effectName,setEffectName] = useState('No Effect');
    const synthNames = Synths.getAllNames();
    const noteColors = {
        primaryColor    : 'col10',
        secondColor     : 'col11'
    }

    const [showSettings,setShowSettings] = useState(false);

    const context = useContext(AppContext);
    if (!context){
        throw new Error(
            'This cant be used here, firgure that one out loser'
        )
    };
    const currentSynth = useRef(
        Synths.getSynth(synth).synth
    )
    const changeSynth = (synthName : synthName)=>{
        currentSynth.current = Synths.getSynth(synthName).synth;
    }

    useEffect(()=>{
        changeSynth(synth);
        const newEffect = context.getEffects.single.toTone(effectName);
        if (firstUpdate.current !== true && newEffect.length > 0){
            currentSynth.current.disconnect();
            newEffect.forEach(effect=>{
                currentSynth.current.connect(effect);
            })
        }
    },[effectName,synth])

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
    const saveBtnFunc = ()=>{
        context.changePrompts.set.save.tab(index);
    }

    // All for playing the tab
    const playBtnFunc = ()=>{
        playingStateChange();
    }
    const stopBtnFunc = ()=>{
        setPlaying("stopped")
        setCurrentNote(-1);
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
                playNote(tab[currentNote],playOctave,tempo,currentSynth.current).then(()=>{
                    nextNote();
                });
            } else {
                setPlaying("stopped");
            }
        }
        setMarkerPosition();
    },[currentNote])
    const nextNote = ()=>{
        if (changeNote.current === true){
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
        setMarkerPosition();
    },[])
    const lengths :noteLengths[] = [];
    tab.forEach(item=>lengths.push(item.length))
    const shortestNoteLength = noteLengthDisplay === "simplified" ? getShortestNote(lengths).length : "32n";
    const body = tab.map((line,mapIndex)=>{
        return (
            <TabColumnCell 
                shortestNoteLength={shortestNoteLength} showNoteLengths={noteLengthDisplay}
                noteLength={line.length} activeIndex={currentNote} 
                noteIndex={mapIndex} change={change} key={mapIndex} tabIndex={index} 
                instrument={instrumentName} line={line.note} lengthColor={noteColors.secondColor} noteColor={noteColors.primaryColor}/>
        )
    })
    const dropDownInstrumentChange = (valueIn:string)=>{
        let output : instrumentName = 'bass';
        switch (valueIn) {
            case "guitar" : output = 'guitar';
        }
        context.changeTabs.instrument(index,output)
    }
    const dropDownLengthChange = (valueIn:string)=>{
        let output : noteLengthDisplays = 'compressed';
        switch (valueIn) {
            case "simplified" : output = 'simplified'; break;
            case "simplified raw" : output = "simplified raw"; break;
        }
        setNoteLengthDisplay(output);
    }
    const dropDownEffectChange = (valueIn:string)=>{
        const valueLower = valueIn.toLocaleLowerCase();
        switch(valueLower){
            case 'new effect' : 
                context.changePrompts.set.effect('new');
                break;
            case 'add effect' :
                // treat
                console.log("add an effect pls");
                break;
            default : 
                setEffectName(valueIn);
                break;
        } 
        // if (valueIn.toLocaleLowerCase() === "new effect"){
        //     context.changePrompts.set.effect();
        // } else {
        //     setEffectName(valueIn);
        // }
    }


    return (
        <div id="tabTable" className="bgCol2 font1">
            <div className="topIcons iconDiv">
                    <BtnIcon icon="save" onClick={saveBtnFunc}/>
                    <BtnIcon icon="cancel" onClick={closeBtnFunc}/>
                </div>
            <div className="topSection row">
                <input className="textInput font2 col6" typeof="text" value={title} onChange={(e)=>setTitle(e.target.value)} onBlur={(e)=>textOnExit(e.target.value)}/>
                
            </div>
            {/* Tried to clean it a bit with seperate components but I think the prop drilling looks worse. */}
            <MidSection settings={{showSettings:showSettings,setShowSettings:setShowSettings}} 
                        synth={{synthName:synth,setSynth:setSynth,synthNames:synthNames}}
                        octave={{playOctave:playOctave,setPlayOctave:setPlayOctave}}
                        tempo={{tempoValue:tempo,setTempo:setTempo,changeTempo:changeTempo}} 
                        notes={{noteLengthDisplay:noteLengthDisplay, dropDownLengthChange:dropDownLengthChange}}
                        instruments={{instrumentName:instrumentName,dropDownInstrumentChange:dropDownInstrumentChange}}
                        effects={{effectName:effectName, dropDownEffectChange:dropDownEffectChange}}
                        noteFunctions={{addNote:addNoteBtnFunc,removeNote:removeNoteBtnFunc}}
                        playControls={{playBtnFunc:playBtnFunc,stopBtnFunc:stopBtnFunc,setRepeat:setRepeat,repeat:repeat}}
                        playing={playing}/>

            <div className="bottomSection row">
                <div className="bottomRightSection">
                    <div className="tableContainer bgCol2 borderCol7 col10">
                        <div className="tableBody ">
                            <TabColumnHeader data={stringNames} noteClass={noteColors.secondColor}/>
                            {body}
                            <div className="tableFooter">
                                <TimingDisplayIcon left={markerPosition.current}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TabTable;