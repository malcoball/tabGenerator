import { effectType, tabType } from "../@types/types";
import { keyMethods } from "../StaticFunctions";

const SaveData = {
    tabTo : {
        localStorage : (tabIn:tabType,saveName:string)=>{
            const key = keyMethods.fileKey.create(saveName,'tab');
            const parseTab = JSON.stringify(tabIn);
            localStorage.setItem(key,parseTab);
        }
    },
    effectTo : {
        localStorage : (effectIn:effectType,saveName:string)=>{
            const key = keyMethods.fileKey.create(saveName,'effect');
            const parseTab = JSON.stringify(effectIn);
            localStorage.setItem(key,parseTab);
        }
    }
};
export default SaveData;