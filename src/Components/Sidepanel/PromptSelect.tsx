import { useContext} from 'react';
import './Style/PromptSelectStyle.css';
import { AppContext } from '../../Data/AppContent';
import { promptTypes } from '../../Data/@types/types';
type props = {
    closeFunc:()=>void
}

const PromptSelect = (props:props)=>{ 
    const context = useContext(AppContext);
    if (!context){throw new Error('This cant be used here lulz');}
    
    const btnClick = (promptType:promptTypes)=>{
        promptType === 'newEffect' ? 
        context.changePrompts.set.effect() :
        context.changePrompts.set.tab();

        props.closeFunc();
    }
    
    return(
        <div className='promptSelect'>
            <div className="clickable col1 col2H bgCol5" onClick={()=>{btnClick("newTab")}}>New Tab?</div>
            <div className="clickable col1 col2H bgCol5" onClick={()=>{btnClick("newEffect")}}>New Effect?</div>
        </div>
    )
}
export default PromptSelect;