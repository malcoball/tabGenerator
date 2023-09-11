import './NewNotePromptStyle/NotePromptShowNoteStyle.css';

const NotePromptShowNote = (props:{number:number, note:string,fretNumber:number})=>{
    return (
        <div id="NotePromptShowNote">
            <span>{props.fretNumber}</span>
            <hr></hr>
            <span>{props.number}</span>=
            <span>{props.note}</span>
        </div>
    )
}

export default NotePromptShowNote;