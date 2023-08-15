import { useState, useContext } from 'react';
import { instrumentName, noteLengths, scaleName } from '../../Data/@types/types';
import './NewTabPromptStyle/NewTabPrompt.css';
import { scaleMethods } from '../../Data/Music/Scales';
import { Instruments, InstrumentsAll } from '../../Data/Music/Instruments';
// import { Slider } from '@mui/material';
import { AppContext } from '../../Data/AppContent';
type NewTabProps = {
    closeFunc : ()=>void,
}
type DropDownInputProps = {
    updateState : any, // could change this
    items : string[],
    title : string,
}
type MultiSelectInputProps = {
    updateState : (index:number)=>void,
    options : string[],
    active : boolean[]
}
type SingleSelectInputProps = {
    index:number,
    item:string,
    active:boolean,
    handleClick:(index:number)=>void
}

const DropDownInput = (props:DropDownInputProps)=>{
    const {items,title,updateState} = props;
    const clickHandler = (e:React.MouseEvent<HTMLOptionElement, MouseEvent>)=>{
        const click = e.target as HTMLSelectElement;
        updateState(click.value);
    }

    const options = items.map(item=><option onClick={(e)=>{clickHandler(e)}} value={item}>{item}</option>)

    return (
        <select name={title}>
            {options}
        </select>
    )
}

const SelectInput = (props:SingleSelectInputProps)=>{
    const {index,item,active,handleClick} = props;
    const className = props.active ? "active" : "";
    return (
        <span className={"selectInput " + className} onClick={()=>{handleClick(index)}}>{item + active} <br></br></span>
    )
}
export const MultiSelectInput = (props:MultiSelectInputProps)=>{
    const options = props.options.map((item,index)=><SelectInput index={index} handleClick={props.updateState} item={item} active={props.active[index]}/>)
    return (
        <div>
            {options}
        </div>
    )
}

const NewTabPrompt = (props:NewTabProps)=>{
    const context = useContext(AppContext);
    if (!context){
        throw new Error(
            'This cant be used here, firgure that one out loser'
        )
    };

    const [scale,setScale] = useState<scaleName>("ionian");
    const scales = scaleMethods.getAll.name();

    const [instrumentName,setinstrumentName] = useState<instrumentName>('guitar');
    const instruments = InstrumentsAll.getAll.names();

    const [tempo,setTempo] = useState<number>(120);

    const [title,setTitle] = useState<string>('Not Set');

    const [length,setLength] = useState<number>(4);

    const [octave,setOctave] = useState<number>(0);

    const [rootnote,setRootnote] = useState<number>(0);

    const [noteLengths,setNoteLengths] = useState<boolean[]>([false,false,false,true,false,false]);
    const noteLengthOptions : noteLengths[] = ['1n','2n','4n','8n','16n','32n'];
    const noteLengthChange = (index:number)=>{
        const lengthsOut = [...noteLengths];
        lengthsOut[index] = !lengthsOut[index];
        setNoteLengths(lengthsOut);
    }

    const [deadNotes,setDeadnotes] = useState<number>(0);

    const handleLengthChange = (event: Event, newValue: number | number[]) => {
        setLength(newValue as number);
      };
    const handleOctaveChange = (event: Event, newValue: number | number[]) => {
        setOctave(newValue as number);
      };
    const handleRootnoteChange = (event: Event, newValue: number | number[]) => {
        setRootnote(newValue as number);
      };
    const handleDeadNotesChange = (event: Event, newValue: number | number[]) => {
        setDeadnotes(newValue as number);
      };

    const onCloseClick = ()=>{
        props.closeFunc();
    }
    const handleCreateButton = ()=>{
        context.changeTabs.add(title,scale,instrumentName,length,rootnote,octave,noteLengths,deadNotes);
        onCloseClick();
    }
    return (
        <div id="newTabPrompt" >
            <span onClick={onCloseClick}>X</span>
            <h5>New Tab Prompt</h5>
            Title :<input value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
            Tempo :<input value={tempo} onChange={(e)=>{setTempo(parseInt(e.target.value))}}/>
            <DropDownInput title='instrument' items={instruments}  updateState={setinstrumentName}/>
            <DropDownInput title='instrument' items={scales}  updateState={setScale}/>
            <br></br>
            Length : {length}
            {/* <Slider aria-label="TabLength" value={length} onChange={handleLengthChange} marks min={1} max={12}/> */}
            Octave : {octave}
            {/* <Slider aria-label="OctaveLength" value={octave} onChange={handleOctaveChange} marks min={0} max={5}/> */}
            Rootnote : {rootnote}
            {/* <Slider aria-label="Rootnote" value={rootnote} onChange={handleRootnoteChange} min={0} max={11}/> */}
            <MultiSelectInput updateState={noteLengthChange} options={noteLengthOptions} active={noteLengths}/>
            Deadnote chance : {deadNotes}
            {/* <Slider aria-label="Deadnotes" value={deadNotes} onChange={handleDeadNotesChange} step={5} min={0} max={100}/> */}

            <br></br>
            <button onClick={handleCreateButton}>Create!</button>
        </div>
    )
}

export default NewTabPrompt;