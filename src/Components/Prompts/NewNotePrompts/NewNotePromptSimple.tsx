import {useState, useContext, useEffect} from 'react';
import { FretboardContext } from './FretboardExtras/FretboardContext';
import { noteLengths } from '../../../Data/@types/types';
import './NewNotePromptStyle/NewNoteSimpleStyle.css';
import { conversions } from '../../../Data/StaticFunctions';
import MultiSelectComponent from '../TabPromptComponents/MultiSelectComponent';
import PlayNoteButton from '../../Inputs/PlayNoteButton';
import { playNote } from '../../../Data/Tone/Tone';
import Synths from '../../../Data/Tone/Instruments/Synths/Synths';


const NewNotePromptSimple = ()=>{
    const context = useContext(FretboardContext);
    if (context === null) throw new Error("err");
    const rootNote = context.noteData.rootNote;
    const noteLengthOptions : noteLengths[] = ['1n','2n','4n','8n','16n','32n'];
    const noteLengthChange = (indexIn:number)=>{

        const lengthsOut:boolean[] = [];
        noteLengths.forEach((item,index)=>{
            index !== indexIn ? lengthsOut.push(false) : lengthsOut.push(true)
        })
        setNoteLengths(lengthsOut);
    }
    const [noteLengths,setNoteLengths] = useState<boolean[]>(conversions.length.toBooleans(context.noteData.selectedLength));
    const [noteLength,setNoteLength] = useState<noteLengths>("8n");
    useEffect(()=>{
        const lengthOut = conversions.lengths.booleansToLengths(noteLengths)[0];
        setNoteLength(lengthOut);
        context.updateSelectedLength(lengthOut);
    },[noteLengths])

    const btnClick = ()=>{
        context.updateTab();
    }
    // Show the raw note data
    const value = context.noteData.selectedNote;
    // Show the parsed note data
    const [letterValue,setLetterValue] = useState(conversions.noteTo.noteLetter(value.toString()))
    useEffect(()=>{
        const selectedSynth = context.noteData.selectedSynth;
        const synth = Synths.getSynth(selectedSynth).synth;
        const octave = context.noteData.octave;
        
        playNote({note : value,length : noteLength},octave,120,synth)
        const parseData = (parseInt(value)+rootNote).toString();
        const letter = conversions.noteTo.noteLetter(parseData);
        setLetterValue(letter);
    },[value]);

    const updateLetterValue = (inputValue:string)=>{
        let update = false;
        inputValue = inputValue.toUpperCase();
        if (inputValue.length < 2){
            // Is it a letter?
            if ((isNaN(parseInt(inputValue)) === true) || (inputValue === "")){
                setLetterValue(inputValue);
                // update = true;
            }
        } else 
        if (isNaN(parseInt(inputValue.charAt(1))) !== true){
            // Is a number?
            setLetterValue(inputValue);
            update = true;
        }
        if (update) {
            const parse = conversions.noteLetterTo.number(inputValue);
            context.updateNoteData(parse-rootNote,'selectedNote');
        }
    }
    return (
        <div id="newNotePromptSimple" className='borderCol6 promptBgCol1 col8'>
            <div className="topSection">
                <input
                    type='text'
                    value={value}
                    onChange={(event)=>{context.updateNoteData(event.target.value,'selectedNote')}}
                />
                <input 
                    type="text"
                    value={letterValue}
                    onChange={(event)=>{updateLetterValue(event.target.value)}}
                    />
            </div>
            <PlayNoteButton note={{note : value,length : noteLength}} synth={context.noteData.selectedSynth} octave={context.noteData.octave}/>
            <MultiSelectComponent title="yes" activeValues={noteLengths} values={noteLengthOptions} updateValues={noteLengthChange}/>
            <button className='bgCol7 col2H col1 clickable' id='createButton' onClick={btnClick}>Change note</button>
        </div>
    )
}
export default NewNotePromptSimple;