import './PromptBehindStyle/PromptBehindStyle.css';

const PromptBehind = (props:{closeFunc:()=>void})=>{
    return (
        <div id="PromptBehind" onClick={props.closeFunc}></div>
    )
}
export default PromptBehind;