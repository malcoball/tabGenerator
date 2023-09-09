import { tabType } from "../@types/types";

const SaveData = {
    tabTo : {
        localStorage : (tabIn:tabType,saveName:string)=>{
            const parseTab = JSON.stringify(tabIn);
            const key = `tab : ${saveName}`;
            localStorage.setItem(key,parseTab);
            console.log(`Stored as, Key : ${key}, Data : ${parseTab}`)
        }
    },
    effectTo : {

    }
};
export default SaveData;