import { useContext} from 'react';
import './Style/PromptSelectStyle.css';
import { AppContext } from '../../Data/AppContent';
import { promptTypes } from '../../Data/@types/types';
type props = {
    closeFunc:()=>void,
    prompts : {
        type : promptTypes,
        title : string
    }[],
}

const PromptSelect = (props:props)=>{ 
    const context = useContext(AppContext);
    if (!context){throw new Error('This cant be used here lulz');}
    
    const btnClick = (promptType:promptTypes)=>{
        switch(promptType){
            case 'newEffect' : 
                context.changePrompts.set.save.effect.reset();
                context.changePrompts.set.effect('new'); 
                break;
            case 'newTab'    : context.changePrompts.set.tab(); break;
            case 'loadTab'   : context.changePrompts.set.load.tab(); break;
            case 'loadEffect'   : context.changePrompts.set.load.effect(); break;
        }

        props.closeFunc();
    }
    const Items = props.prompts.map(item=><div className="clickable col1 col2H bgCol5" onClick={()=>{btnClick(item.type)}}>{item.title}</div>)
    
    return(
        <div className='promptSelect'>
            {/* <div className="clickable col1 col2H bgCol5" onClick={()=>{btnClick("newTab")}}>New Tab?</div>
            <div className="clickable col1 col2H bgCol5" onClick={()=>{btnClick("newEffect")}}>New Effect?</div> */}
            {Items}
        </div>
    )
}
export default PromptSelect;