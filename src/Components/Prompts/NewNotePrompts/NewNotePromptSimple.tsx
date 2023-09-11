import {useState, useContext, useEffect} from 'react';
import { DataContext } from './FretboardExtras/FretboardContext';
import { noteLengths } from '../../../Data/@types/types';
import './NewNotePromptStyle/NewNoteSimpleStyle.css';
import { conversions } from '../../../Data/StaticFunctions';
import MultiSelectComponent from '../TabPromptComponents/MultiSelectComponent';


const NewNotePromptSimple = ()=>{
    const context = useContext(DataContext);
    const rootNote = context.data.rootNote;
    const noteLengthOptions : noteLengths[] = ['1n','2n','4n','8n','16n','32n'];
    const noteLengthChange = (indexIn:number)=>{

        const lengthsOut:boolean[] = [];
        noteLengths.forEach((item,index)=>{
            index !== indexIn ? lengthsOut.push(false) : lengthsOut.push(true)
        })
        setNoteLengths(lengthsOut);
    }
    const [noteLengths,setNoteLengths] = useState<boolean[]>(conversions.length.toBooleans(context.data.selectedLength));
    useEffect(()=>{
        context.updateSelectedLength(conversions.lengths.booleansToLengths(noteLengths)[0]);
    },[noteLengths])
    const btnClick = ()=>{
        context.updateTab();
    }
    // Show the raw note data
    const value = context.data.selectedNote;
    // Show the parsed note data
    const [letterValue,setLetterValue] = useState(conversions.noteTo.noteLetter(value.toString()))
    useEffect(()=>{
        const parseData = (parseInt(value)+rootNote).toString();
        const letter = conversions.noteTo.noteLetter(parseData);
        setLetterValue(letter);
    },[value]);

    const updateLetterValue = (value:string)=>{
        let update = false;
        value = value.toUpperCase();
        if (value.length < 2){
            // Is it a letter?
            if ((isNaN(parseInt(value)) === true) || (value === "")){
                setLetterValue(value);
                // update = true;
            }
        } else 
        if (isNaN(parseInt(value.charAt(1))) !== true){
            // Is a number?
            setLetterValue(value);
            update = true;
        }
        if (update) {
            const parse = conversions.noteLetterTo.number(value);
            context.updateState(parse-rootNote,'selectedNote');
        }
    }
    return (
        <div id="newNotePromptSimple" className='borderCol6 promptBgCol1 col8'>
            <div className="topSection">
                <input
                    type='text'
                    value={value}
                    onChange={(event)=>{context.updateState(event.target.value,'selectedNote')}}
                />
                <input 
                    type="text"
                    value={letterValue}
                    onChange={(event)=>{updateLetterValue(event.target.value)}}
                    />
            </div>
            <MultiSelectComponent title="yes" activeValues={noteLengths} values={noteLengthOptions} updateValues={noteLengthChange}/>
            <button className='bgCol7 col2H col1 clickable' id='createButton' onClick={btnClick}>New Note</button>
        </div>
    )
}
export default NewNotePromptSimple;