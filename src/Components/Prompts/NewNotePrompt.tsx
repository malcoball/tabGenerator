import {useState} from 'react';
import { noteLengths,note } from '../../Data/@types/types';
import './NewNotePromptStyle/NewNoteStyle.css';
import { MultiSelectInput } from './NewTabPrompt';
import { conversions } from '../../Data/StaticFunctions';
type NewNotePromptProps = {
    noteValue:note,
    closeFunc : ()=>void,
    tabIndex : number,
    noteIndex : number,
    noteChange : (tabIndex: number, noteIndex: number, changeValue: note)=>void
}
const NewNotePrompt = (props:NewNotePromptProps)=>{
    const [noteValue,setNoteValue] = useState((props.noteValue.note));
    const noteValueChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const valueStr = e.target.value;
        setNoteValue(valueStr);
    }
    const [noteLengths,setNoteLengths] = useState<boolean[]>(conversions.length.toBooleans(props.noteValue.length));
    const noteLengthOptions : noteLengths[] = ['1n','2n','4n','8n','16n','32n'];
    const noteLengthChange = (indexIn:number)=>{

        const lengthsOut:boolean[] = [];
        noteLengths.forEach((item,index)=>{
            index !== indexIn ? lengthsOut.push(false) : lengthsOut.push(true)
        })
        setNoteLengths(lengthsOut);
    }

    const buttonPress = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        const {tabIndex,noteIndex} = props;
        const note:note = {note:noteValue,length:'8n'};
        note.length = conversions.lengths.booleansToLengths(noteLengths)[0];
        e.stopPropagation();
        props.closeFunc();
        props.noteChange(tabIndex,noteIndex,note);
    }
    return (
        <div id="newNotePrompt">
            <h5>I am the prompt king</h5>
            <input
                type='number'
                value={noteValue}
                onChange={(e)=>{noteValueChange(e)}}
            />
            <MultiSelectInput updateState={noteLengthChange} options={noteLengthOptions} active={noteLengths}/>
            <button onClick={(e)=>{buttonPress(e)}}>Change places!</button>
        </div>
    )
}
export default NewNotePrompt;