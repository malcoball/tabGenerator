import './NewNotePromptStyle/NotePromptShowNoteStyle.css';

const NotePromptShowNote = (props:{number:number, note:string})=>{
    return (
        <div id="NotePromptShowNote">
            <span>{props.number}</span>,
            <span>{props.note}</span>
        </div>
    )
}

export default NotePromptShowNote;