import { note } from "../../Data/@types/types";
import Synths from "../../Data/Tone/Instruments/Synths/Synths";
import { playNote } from "../../Data/Tone/Tone";
import BtnIcon from "../Icons/Buttons/BtnIcon";

type props = {
    note : note
    synth : any,
    octave : number
}
const PlayNoteButton = (props:props)=>{
    const {note,synth,octave} = props;
    const playAudio = ()=>{
        const synthOut = Synths.getSynth(synth).synth;
        playNote(note,octave,120,synthOut);
    }
    return (
        <BtnIcon icon="play" onClick={playAudio}/>
    )
}

export default PlayNoteButton;