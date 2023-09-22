import SavePrompt from "./SaveLoadPrompt/SavePrompt"
import { useContext} from 'react';
import { promptTypes } from "../../Data/@types/types";
import { AppContext } from "../../Data/AppContent";
import NewEffectsPrompt from "./NewEffectsPrompt";
import NewNotePromptFretboard from "./NewNotePrompts/NewNotePromptFretboard";
import NewTabPrompt from "./NewTabPrompt";
import LoadPrompt from "./SaveLoadPrompt/LoadPrompt";
import './promptContainerStyle.css';
const PromptController = ()=>{
    const context = useContext(AppContext);
    if (!context) throw Error("didn't load lulz");
    const activePrompt : promptTypes = context.getPrompts.active;
    // const activePrompt : promptTypes = context.getPrompts.single();
    // const [activePrompt,setActivePrompt] = useState<promptTypes>('save');
    return (
        <>
            {activePrompt === 'saveTab' && <SavePrompt type="tab"/>}
            {activePrompt === 'saveEffect' && <SavePrompt type="effect"/>}
            {activePrompt === 'loadTab' && <LoadPrompt type='tab'/>}
            {activePrompt === 'loadEffect' && <LoadPrompt type='effect'/>}
            {activePrompt === 'newEffect' && <NewEffectsPrompt/>}
            {activePrompt === 'newNoteFretboard' && <NewNotePromptFretboard/>}
            {activePrompt === 'newTab' && <NewTabPrompt/>}
        </>
    )
}
export default PromptController;