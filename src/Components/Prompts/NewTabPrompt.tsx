import { useState, useContext } from 'react';
import { instrumentName, noteLengths, scaleName } from '../../Data/@types/types';
import './NewTabPromptStyle/NewTabPrompt.css';
import './TabPromptComponents/SharedStyle.css';
import { scaleMethods } from '../../Data/Music/Scales';
import { Instruments, InstrumentsAll } from '../../Data/Music/Instruments';
import { AppContext } from '../../Data/AppContent';
import SliderComponent from './TabPromptComponents/SliderComponent';
import MultiSelectComponent from './TabPromptComponents/MultiSelectComponent';
import DropDownComponent from './TabPromptComponents/DropdownComponent';
import PromptBehind from './PromptBehind';

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

const NewTabPrompt = ()=>{
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

    const [title,setTitle] = useState<string>('');
    const buttonClass = title.length > 0 ? 'bgCol7 col2H col1 clickable active' : 'bgCol1 bgCol1H unactive';

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

    const handleTempoChange = (event: Event, newValue: number | number[]) => {
        setTempo(newValue as number);
      };
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
        context.changePrompts.close.standard();
    }
    const handleCreateButton = ()=>{
        if (title.length > 0){
            context.changeTabs.create(title,scale,instrumentName,length,rootnote,octave,noteLengths,deadNotes);
            onCloseClick();
        }
    }
    return (
        <div className="promptContainer">
            <div id="newTabPrompt" className='borderCol6 promptBgCol1'>
                <textarea className='col1' id='Title' value={title} onChange={(event)=>{setTitle(event.target.value)}} placeholder='Enter Name'/>
                <div className="midSection">
                    <div className="leftSection">
                        <SliderComponent title='Tempo' value={tempo} setValue={handleTempoChange} max={240}/>
                        <SliderComponent title='Length' value={length} setValue={handleLengthChange} min={1} max={12}/>
                        <SliderComponent title='Octave' value={octave} setValue={handleOctaveChange} max={5}/>
                        <SliderComponent title='Rootnote' value={rootnote} setValue={handleRootnoteChange} max={11}/>
                    </div>
                    <div className="rightSection">
                        <SliderComponent title='Deadnote chance' value={deadNotes} setValue={handleDeadNotesChange} max={100}/>
                        <DropDownComponent title="Instrument" values={instruments} activeValue={instrumentName} updateState={setinstrumentName}/>
                        <DropDownComponent title="Scale" values={scales} activeValue={scale} updateState={setScale}/>
                        <MultiSelectComponent title='Note Lengths' values={noteLengthOptions} activeValues={noteLengths} updateValues={noteLengthChange}/>
                    </div>
                </div>
                <button className={buttonClass} onClick={handleCreateButton} id='createButton'>Create Tab</button>
            </div>
            <PromptBehind closeFunc={onCloseClick}/>
        </div>
    )
}

export default NewTabPrompt;